// eslint-disable-next-line no-unused-vars
class Media {
  constructor(id, photographerId, title, media, likes, date, price) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.media = media;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }
  /**
   * @name createMedia
   * @returns a media component
   */

  createMedia(index, folderName) {
    const mediaSrc = `assets/medias/${folderName}/${this.media}`;
    const article = document.createElement("article");

    article.innerHTML = `
    <div class="media">
      ${
        // if the media is an image, return an image element, else return a video element
        this.media.includes(".jpg", ".png", ".gif", ".webp")
          ? `<img src='${mediaSrc}' alt='${this.title}' class='media-item'>`
          : `<video src='${mediaSrc}' title='${this.title}' controls autoplay loop class='media-item'></video>`
      }
      </div>
      <div class='media-infos'>
        <span>${this.title}</span>
        <div>
          <span>${this.likes}</span>
          <i class="heart far fa-heart" aria-label="likes"></i>
        </div>
      </div>
 
    `;
    // add the click event listener to launch the lightbox and show the clicked media
    article
      .querySelector(".media")
      // eslint-disable-next-line no-undef
      .addEventListener("click", () => setUpLightbox.openLightbox(index));

    // add the click event listener to add / remove a like
    const likeButton = article.querySelector(".media-infos .heart");
    likeButton.addEventListener("click", () =>
      // eslint-disable-next-line no-undef
      handleLikes(index)
    );
    return article;
  }
}
