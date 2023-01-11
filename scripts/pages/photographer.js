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
  const container = document.querySelector(".photograph-header > div");
  const h1 = document.querySelector(".photograph-header > div > h1");
  const div = document.querySelector(".photograph-header > div > div");
  const span = document.querySelector(".photograph-header > div > span");
  const img = document.querySelector(".photograph-header > img");
  const likesContainer = document.querySelector(".sticky .total-likes");
  const priceContainer = document.querySelector(
    ".sticky .price-container .price"
  );

  // add the name to the modal title
  modalHeaderTitle.textContent += "\n" + name;
  // add photographer infos and picture to the header
  container.setAttribute("aria-label", `Informations sur ${name}`);
  h1.setAttribute("aria-label", `Nom: ${name}`);
  h1.textContent = `${name}`;
  div.setAttribute("aria-label", `Lieu: ${city}, ${country}`);
  div.textContent = `${city}, ${country}`;
  span.setAttribute("aria-label", `Phrase: ${tagline}`);
  span.textContent = `${tagline}`;
  img.setAttribute("src", `assets/photographers/${portrait}`);
  img.setAttribute("alt", `Photo de ${name}`);

  // add the total likes number
  likesContainer.prepend(likesCount);
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
  const folderName = await getFolderName(userId);
  medias.forEach((media, index) => {
    const newMedia = new Media(
      media.id,
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
 * @function init
 * run showMedia and showInfo functions
 */
async function init() {
  // get the photographer id to pass it as a paramater to other functions
  const url = new URL(document.location);
  const searchParams = url.searchParams;
  const userId = parseInt(searchParams.get("id"));

  showInfo(userId);
  showMedia(userId);
}

init();
