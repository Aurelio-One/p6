function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;
  /**
   * @function getUserCardDOM
   * Build a photographer component on the landing page
   */
  function getUserCardDOM() {
    const article = document.createElement('article');
    article.innerHTML += `
    <a href='photographer.html?id=${id}'>
      <img 
        src='${picture}' 
        alt='Photo de ${name}' 
        class='photographer-image'
      >
      <h2 aria-label='Nom: ${name}'>${name}</h2>
    </a>
    <h3 aria-label='Lieu: ${city}, ${country}'>${city}, ${country}</h3>
    <h4 aria-label='Phrase:  ${tagline}'>${tagline}</h4>
    <h5 aria-label='Prix: ${price}€/jour'>${price}€/jour</h5>
    `;

    return article;
  }
  return { getUserCardDOM };
}
