async function getPhotographers() {
  return fetch("data/photographers.json")
    .then((res) => res.json())
    .then((res) => res.photographers)
    .catch((err) => console.log("an error occurs", err));
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  displayData(await getPhotographers());
}

init();
