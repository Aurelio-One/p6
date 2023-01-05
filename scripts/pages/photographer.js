const url = new URL(document.location);
const searchParams = url.searchParams;
const id = parseInt(searchParams.get("id"));

async function getInfos() {
  return fetch("data/photographers.json")
    .then((res) => res.json())
    .then((res) =>
      res.photographers.filter(function (x) {
        return x["id"] === id;
      })
    )
    .catch((err) => console.log("an error occurs", err));
}

async function displayInfos(infos) {
  infos.forEach((info) => {
    photographerFactory(info).getUserPageDOM();
  });
}

async function getMedias() {
  return fetch("data/photographers.json")
    .then((res) => res.json())
    .then((res) =>
      res.media.filter(function (x) {
        return x["photographerId"] === id;
      })
    )
    .catch((err) => console.log("an error occurs", err));
}

async function displayMedias(medias) {
  const mediaSection = document.querySelector(".photograph-medias");

  medias.forEach((media) => {
    const mediaCardDOM = mediaFactory(media).getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  displayMedias(await getMedias());
  displayInfos(await getInfos());
}

init();
