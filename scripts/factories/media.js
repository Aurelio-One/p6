function mediaFactory(data) {
  const { photographerId, title, likes, date, image, video } = data;
  const imageMedia = `assets/medias/${photographerId}/${image}`;
  const videoMedia = `assets/medias/${photographerId}/${video}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    if (data["image"] !== undefined) {
      article.innerHTML = `<img src="${imageMedia}" alt="${title}" class="media-item">`;
    }
    if (data["video"] !== undefined) {
      article.innerHTML = `<video src="${videoMedia}" title="${title}" controls autoplay loop class="media-item"></video>`;
    }
    article.innerHTML +=`
    <div class="media-infos">
      <span>${title}</span>
      <div>
        <span>${likes}</span>
        <img src="assets/images/likes.png" alt="likes">
      </div>
    </div>
    `;
    return article;
  }
  return { getMediaCardDOM };
}
