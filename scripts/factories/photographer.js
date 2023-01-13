// eslint-disable-next-line no-unused-vars
class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }
  /**
   * @name createPhotographer
   * @returns a photographer component
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
