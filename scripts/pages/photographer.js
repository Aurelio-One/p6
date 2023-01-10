/**
 * @function getInfos {
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
 * @function showInfo {
 * show the photographer infos when the data is ready
 */
async function showInfo(userId) {
  const info = await getInfos(userId);
  const { name, city, country, tagline, portrait } = info;
  // get elements
  const modalHeaderTitle = document.querySelector(".modal header h2");
  const container = document.querySelector(".photograph-header > div");
  const h1 = document.querySelector(".photograph-header > div > h1");
  const div = document.querySelector(".photograph-header > div > div");
  const span = document.querySelector(".photograph-header > div > span");
  const img = document.querySelector(".photograph-header > img");

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
}

/**
 * @function getMedias {
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
 * @function displayMedias {
 * @param medias
 * display the medias of the photographer using the mediaFactory function
 */
async function displayMedias(medias) {
  const mediaSection = document.querySelector(".photograph-medias");
  medias.forEach((media) => {
  const newMedia = new Media(
    media.id,
    media.photographerId,
    media.title,
    media.image ? media.image : media.video,
    media.likes,
    media.date,
    media.price
    )
    mediaSection.innerHTML += newMedia.createMedia();
  });
}


/**
 * @function showMedia {
 * show the photographer medias when the data is ready
 */
async function showMedia(userId) {
  const medias = await getMedias(userId);
  displayMedias(medias);
}

/**
 * @function init {
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
