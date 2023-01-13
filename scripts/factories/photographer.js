/**
 * Class representing a photographer.
 * */
// eslint-disable-next-line no-unused-vars
class Photographer {
    /**
   * Create a photographer.
   * @param {string} name - The photographer's name.
   * @param {number} id - The photographer's id.
   * @param {string} city - The photographer's city.
   * @param {string} country - The photographer's country.
   * @param {string} tagline - The photographer's tagline.
   * @param {number} price - The photographer's price per day.
   * @param {string} portrait - The photographer's profile image link.
   *
   */
  constructor(name, id, city, country, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }
  /**
   * Create a photographer component.
   * @return a photographer component.
   */
  createPhotographer() {
    return `
    <article>
      <a href='photographer.html?id=${this.id}'>
        <img 
          src='assets/photographers/${this.portrait}'
          alt='Photo de ${this.name}' 
          class='photographer-image'
        >
        <h2 aria-label='Nom: ${this.name}'>${this.name}</h2>
      </a>
      <h3 aria-label='Lieu: ${this.city}, ${this.country}'>${this.city}, ${this.country}</h3>
      <h4 aria-label='Phrase:  ${this.tagline}'>${this.tagline}</h4>
      <h5 aria-label='Prix: ${this.price}€/jour'>${this.price}€/jour</h5>
    </article>
    `;
  }
}
