async function getPhotographers() {
  try {
    const res = await fetch('data/photographers.json')
    const jsonRes = await res.json()
    return jsonRes.photographers
  } catch (err) {
    console.error(err)
    throw err
  }
}

/**
 * @function displayData {
 * @param photographers
 * Display the photographers data using photographerFactory
 */
async function displayPhotographers(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

/**
 * @function init {
 * run displayPhotographers
 */

async function init() {
  const photographers = await getPhotographers()
  displayPhotographers(photographers)
}

init()
