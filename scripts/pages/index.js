async function getPhotographers() {
  try {
    const res = await fetch("data/photographers.json");
    const jsonRes = await res.json();
    return jsonRes.photographers;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * @function displayData {
 * @param photographers
 * Display the photographers data using photographerFactory
 */
async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const newPhotographer = new Photographer(
      photographer.name,
      photographer.id,
      photographer.city,
      photographer.country,
      photographer.tags,
      photographer.tagline,
      photographer.price,
      photographer.portrait
    );
    photographersSection.innerHTML += newPhotographer.createPhotographer();
  });
}

/**
 * @function init {
 * run displayPhotographers
 */

async function init() {
  const photographers = await getPhotographers();
  displayPhotographers(photographers);
}

init();
