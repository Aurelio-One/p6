function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  /**
   * @function getUserCardDOM
   * Build a photographer component on the landing page
   */
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML += `
    <a href="photographer.html?id=${id}">
      <img 
        src="${picture}" 
        alt="Photo de ${name}" 
        class="photographer-image"
      >
      <h2 aria-label="Nom: ${name}">${name}</h2>
    </a>
    <h3 aria-label="Lieu: ${city}, ${country}">${city}, ${country}</h3>
    <h4 aria-label="Phrase:  ${tagline}">${tagline}</h4>
    <h5 aria-label="Prix: ${price}€/jour">${price}€/jour</h5>
    `;

    return article;
  }

  /**
   * @function getUserPageDOM
   * Build a photographer component for his page
   */
  function getUserPageDOM() {
    // capture the header HTML
    const headerHTML = document.querySelector(".photograph-header").innerHTML;
    // add the name to the modal title
    document.querySelector(".modal header h2").innerHTML += "<br />" + name;
    // add photographer infos and picture to the header
    document.querySelector(".photograph-header").innerHTML = `
    <div aria-label="Informations sur ${name}">
      <h1 aria-label="Nom: ${name}">${name}</h1>
      <div aria-label="Lieu: ${city}, ${country}">${city}, ${country}</div>
      <span aria-label="Phrase: ${tagline}">${tagline}</span>
    </div>
    ${headerHTML}
    <img 
      src="${picture}" 
      alt="Photo de ${name}" 
      class="photographer-image"
    >
    `;
    // add the sticky section to the body
    document.querySelector("body").innerHTML += `
    <div class="sticky">
      <div>
      <img>
      <span>
      </span>
      </div>
      <span>${price}€/jour</span>
    </div>
    `;
  }
  return { getUserCardDOM, getUserPageDOM };
}
