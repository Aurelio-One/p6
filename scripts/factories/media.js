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
      ${
        // if the media is an image, return an image element, else return a video element
        this.media.includes(".jpg", ".png", ".gif", ".webp")
          ? `<img src='${mediaSrc}' alt='${this.title}' class='media-item'>`
          : `<video src='${mediaSrc}' title='${this.title}' controls autoplay loop class='media-item'></video>`
      }
      <div class='media-infos'>
        <span>${this.title}</span>
        <div>
          <span>${this.likes}</span>
          <img src='assets/icons/likes.png' alt='likes'>
        </div>
      </div>
 
    `;
    // add the click event listener to launch the lightbox and show the clicked media
    article.addEventListener("click", () => setUpLightbox.openLightbox(index));
    return article;
  }
}
