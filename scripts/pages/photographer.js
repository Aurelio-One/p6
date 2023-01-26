/**
 * @function getInfos
 * @param userId
 * get the data of a photographer based on the URL param 'id'
 */
async function getInfos(userId) {
  try {
    const res = await fetch("data/photographers.json");
    const jsonRes = await res.json();
    return jsonRes.photographers.find((e) => e.id === userId);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * @function showInfo
 * @param userId
 * show the photographer infos when the data is ready
 */
async function showInfo(userId) {
  const info = await getInfos(userId);
  const { name, city, country, tagline, portrait, price } = info;
  const likesCount = await getLikes(userId);

  // get elements
  const modalHeaderTitle = document.querySelector(".modal header h2");
  const h1 = document.querySelector(".photograph-header > div > h1");
  const div = document.querySelector(".photograph-header > div > div");
  const span = document.querySelector(".photograph-header > div > span");
  const img = document.querySelector(".photograph-header > img");
  const likesContainer = document.querySelector(".sticky .total-likes span");
  const priceContainer = document.querySelector(
    ".sticky .price-container .price"
  );
  // change the name of the page
  document.title = `Fisheye - ${name}`;
  // add the name to the modal title
  modalHeaderTitle.textContent += "\n" + name;
  // add photographer infos and picture to the header
  h1.textContent = `${name}`;
  div.textContent = `${city}, ${country}`;
  span.textContent = `${tagline}`;
  img.setAttribute("src", `assets/photographers/${portrait}`);
  img.setAttribute("alt", `Photo de ${name}`);
  // add the total likes number
  likesContainer.textContent = likesCount;
  priceContainer.textContent = `${price}€/jour`;
}

/**
 * @function getMedias
 * @param userId
 * get the data of all medias of a photographer based on the photographerId key
 */
async function getMedias(userId) {
  try {
    const res = await fetch("data/photographers.json");
    const jsonRes = await res.json();
    return jsonRes.media.filter((e) => e.photographerId === userId);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * @function getFolderName
 * @param userId
 * get the name of one photographer's images folder
 */
async function getFolderName(userId) {
  const infos = await getInfos(userId);
  const { name } = infos;
  return name.split(" ")[0].replace("-", " ");
}

/**
 * @function displayMedias
 * @param medias
 * display the medias of the photographer using the mediaFactory function
 */
async function displayMedias(medias, userId) {
  const mediaSection = document.querySelector(".photograph-medias");
  // get the folder name to pass it to createMedia method as a parameter
  const folderName = await getFolderName(userId);
  // get the selected sort method
  const sortMethod = document.querySelector(".sort").getAttribute("data-sort");
  let sortedMedias = medias;
  // sort the medias array according to the sort method set in the DOM
  if (sortMethod == "byLikes") {
    sortedMedias = medias.sort((a, b) => b.likes - a.likes);
  }
  if (sortMethod == "byDate") {
    sortedMedias = medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  if (sortMethod == "byTitle") {
    sortedMedias = medias.sort((a, b) => {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
  }

  // clear the media section before creating media components
  mediaSection.innerHTML = "";
  // create media components using the right sort method
  sortedMedias.forEach((media, index) => {
    // eslint-disable-next-line no-undef
    const newMedia = new Media(
      media.photographerId,
      media.title,
      media.image ? media.image : media.video,
      media.likes,
      media.date,
      media.price
    );
    mediaSection.appendChild(newMedia.createMedia(index, folderName));
  });
}

/**
 * @function showMedia
 * @param userId
 * show the photographer medias when the data is ready
 */
async function showMedia(userId) {
  const medias = await getMedias(userId);
  const folderName = await getFolderName(userId);
  displayMedias(medias, userId);
  // eslint-disable-next-line no-undef
  setUpLightbox(medias, folderName);
}

/**
 * @function getLikes
 * @param userId
 * show the photographer medias when the data is ready
 */
async function getLikes(userId) {
  const medias = await getMedias(userId);
  const likes = medias.map((media) => {
    return media.likes;
  });
  const totalLikes = likes.reduce((pv, cv) => pv + cv, 0);
  return totalLikes;
}

/**
 * @function handlLikes
 * show the photographer medias when the data is ready
 */
// eslint-disable-next-line no-unused-vars
function handleLikes(mediaId) {
  // get elements
  const totalLikesCounterContainer = document.querySelector(
    ".sticky .total-likes>span"
  );
  const likesCounterContainer = document.querySelector(
    `.photograph-medias article:nth-child(${mediaId + 1}) .media-infos>div>span`
  );
  const likesCounterIcon = document.querySelector(
    `.photograph-medias article:nth-child(${
      mediaId + 1
    }) .media-infos>div>.heart`
  );
  // get values
  let totalLikesCounter = parseInt(totalLikesCounterContainer.textContent);
  let likesCounter = parseInt(likesCounterContainer.textContent);

  // add or remove a like
  if (likesCounterIcon.classList.contains("far")) {
    // add a like to the media likes counter and change icon
    likesCounterContainer.textContent = likesCounter + 1;
    likesCounterIcon.classList.remove("far");
    likesCounterIcon.classList.add("fas");
    // add a like to the global likes counter
    totalLikesCounterContainer.textContent = totalLikesCounter + 1;
  } else if (likesCounterIcon.classList.contains("fas")) {
    // remove a like to the media likes counter and change icon
    likesCounterContainer.textContent = likesCounter - 1;
    likesCounterIcon.classList.remove("fas");
    likesCounterIcon.classList.add("far");
    // remove a like to the global likes counter
    totalLikesCounterContainer.textContent = totalLikesCounter - 1;
  }
}

/**
 * @function sort
 * @param method
 * @param userId
 * set the sorting method and run showMedia
 */
async function sort(method, userId) {
  let sortState = document.querySelector(".sort");
  sortState.setAttribute("data-sort", method);

  // display medias
  showMedia(userId);
}

/**
 * @function init
 * set the sorting event listeners and run showMedia and showInfo functions
 */
async function init() {
  // get the photographer id to pass it as a parameter to other functions
  const url = new URL(document.location);
  const searchParams = url.searchParams;
  const userId = parseInt(searchParams.get("id"));

  // set up event listeners
  const optionLikes = document.querySelector(".sort .dropdown .likes");
  const optionDate = document.querySelector(".sort .dropdown .date");
  const optionTitle = document.querySelector(".sort .dropdown .title");
  const dropdownTrigger = document.querySelector(".sort .dropdown-trigger");
  const dropdown = document.querySelector(".sort .dropdown");

  // trigger click when enter is pressed on a focus element
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.activeElement.click();
    }
  });

  // show the dropwn menu
  dropdownTrigger.addEventListener("click", () => {
    dropdown.classList.toggle("active");
    if (dropdownTrigger.getAttribute("aria-expanded") === "true") {
      dropdownTrigger.setAttribute("aria-expanded", "false");
    } else {
      dropdownTrigger.setAttribute("aria-expanded", "true");
    }
  });
  // hide the dropdown menu when clicked outside of it
  window.addEventListener("mouseup", (e) => {
    if (
      !e.target.closest(".dropdown") &&
      dropdown.classList.contains("active")
    ) {
      dropdown.classList.remove("active");
      dropdownTrigger.setAttribute("aria-expanded", "false");
    }
  });
  // sort by likes
  optionLikes.addEventListener("click", (e) => {
    e.stopPropagation();
    // select and hide the like option
    optionLikes.style.display = "none";
    optionLikes.setAttribute("aria-hidden", "true");
    optionLikes.setAttribute("aria-selected", "true");
    // unselect and show the date option
    optionDate.style.display = "block";
    optionDate.setAttribute("aria-hidden", "false");
    optionDate.setAttribute("aria-selected", "false");
    optionTitle.style.display = "block";
    // unselect and show the title option
    optionTitle.setAttribute("aria-hidden", "false");
    optionTitle.setAttribute("aria-selected", "false");
    // display the selected option
    dropdownTrigger.textContent = "Popularité";
    // close the dropdown
    dropdown.classList.remove("active");
    dropdownTrigger.setAttribute("aria-expanded", "false");
    // run sort function
    sort("byLikes", userId);
  });
  // sort by date
  optionDate.addEventListener("click", (e) => {
    e.stopPropagation();
    // unselect and show the like option
    optionLikes.style.display = "block";
    optionLikes.setAttribute("aria-hidden", "false");
    optionLikes.setAttribute("aria-selected", "false");
    // select and hide the date option
    optionDate.style.display = "none";
    optionDate.setAttribute("aria-hidden", "true");
    optionDate.setAttribute("aria-selected", "true");
    // unselect and show the title option
    optionTitle.style.display = "block";
    optionTitle.setAttribute("aria-hidden", "false");
    optionTitle.setAttribute("aria-selected", "false");
    // display the selected option
    dropdownTrigger.textContent = "Date";
    // close the dropdown
    dropdown.classList.remove("active");
    dropdownTrigger.setAttribute("aria-expanded", "false");
    // run sort function
    sort("byDate", userId);
  });
  // sort by title
  optionTitle.addEventListener("click", (e) => {
    e.stopPropagation();
    // unselect and show the like option
    optionLikes.style.display = "block";
    optionLikes.setAttribute("aria-hidden", "false");
    optionLikes.setAttribute("aria-selected", "false");
    // unselect and show the date option
    optionDate.style.display = "block";
    optionDate.setAttribute("aria-hidden", "false");
    optionDate.setAttribute("aria-selected", "false");
    // select and hide the title option
    optionTitle.style.display = "none";
    optionTitle.setAttribute("aria-hidden", "true");
    optionTitle.setAttribute("aria-selected", "true");
    // display the selected option
    dropdownTrigger.textContent = "Titre";
    // close the dropdown
    dropdown.classList.remove("active");
    dropdownTrigger.setAttribute("aria-expanded", "false");
    // run sort function
    sort("byTitle", userId);
  });

  showInfo(userId);
  showMedia(userId);
}

init();
