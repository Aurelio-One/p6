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
  createMedia() {
    const mediaSrc = `assets/medias/${this.photographerId}/${this.media}`;
    return `
    <article>
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
    </article>
    `;
  }
}
