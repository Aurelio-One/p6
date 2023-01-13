// eslint-disable-next-line no-unused-vars
function setUpLightbox(medias, folderName) {
  // get elements
  const lightbox = document.querySelector(".lightbox");
  const buttonPrevious = lightbox.querySelector(
    "[data-lightbox-button-previous]"
  );
  const buttonNext = lightbox.querySelector("[data-lightbox-button-next]");
  const buttonClose = lightbox.querySelector("[data-lightbox-button-close]");
  const main = document.querySelector("main");

  // close button event
  buttonClose.addEventListener("click", closeLightbox);
  // accessibility: close lightbow with esc key
  window.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });

  // allow access to the openLightbox function outside of the setUpLightbox function
  setUpLightbox.openLightbox = openLightbox;

  function showSlide(slideNumber) {
    const mediaTitle = medias[slideNumber].title;
    const mediaInfos = document.querySelector(
      ".lightbox .slides .media-infos span"
    );
    const slideImg = document.querySelector(".lightbox .slides img");
    const slideVideo = document.querySelector(".lightbox .slides video");

    // display the media title
    mediaInfos.textContent = mediaTitle;

    // display the right media depending on media type
    if (medias[slideNumber].image) {
      const mediaSrc = `assets/medias/${folderName}/${medias[slideNumber].image}`;
      slideVideo.style.display = "none";
      slideImg.style.display = "block";
      slideImg.setAttribute("src", mediaSrc);
      slideImg.setAttribute("alt", mediaTitle);
    } else if (medias[slideNumber].video) {
      const mediaSrc = `assets/medias/${folderName}/${medias[slideNumber].video}`;
      slideVideo.style.display = "block";
      slideImg.style.display = "none";
      slideVideo.setAttribute("src", mediaSrc);
      slideVideo.setAttribute("title", mediaTitle);
    }

    // event listeners for next and previous slide
    buttonNext.addEventListener("click", () => showNextSlide(slideNumber));
    buttonPrevious.addEventListener("click", () =>
      showPreviousSlide(slideNumber)
    );
    // accesibility: use keyboard keys to navigate though the slider
    window.addEventListener("keydown", (e) => {
      if (lightbox.getAttribute("aria-hidden") === "false") {
        if (e.key === "ArrowRight") {
          showNextSlide(slideNumber);
        } else if (e.key === "ArrowLeft") {
          showPreviousSlide(slideNumber);
        }
      }
    });
  }

  function showNextSlide(slideNumber) {
    slideNumber === medias.length - 1
      ? showSlide(0)
      : showSlide(slideNumber + 1);
  }

  function showPreviousSlide(slideNumber) {
    slideNumber === 0
      ? showSlide(medias.length - 1)
      : showSlide(slideNumber - 1);
  }

  /** @function openLightbox
   * @param slideNumber
   * open the lightbox and show the right slide
   */
  function openLightbox(slideNumber) {
    // set the right slide
    showSlide(slideNumber);
    // accessiblity: hide the main content, show the lightbox
    main.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("aria-hidden", "false");
    // display the lightbox
    lightbox.style.display = "block";
  }
  /**
   * @function closeLightbox {
   * close the lightbox
   */
  function closeLightbox() {
    // hide the lightbox
    lightbox.style.display = "none";
    // accessiblity: show the main content, hide the lightbox
    main.setAttribute("aria-hidden", "false");
    lightbox.setAttribute("aria-hidden", "true");
  }
}
