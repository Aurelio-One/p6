/** @function setUpLightbox
 * @param medias
 * @param folderName
 * set up lightbox
 */
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
  // accessibility: close lightbox with esc key
  window.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });

  // allow access to the openLightbox function outside of the setUpLightbox function
  setUpLightbox.openLightbox = openLightbox;

  /** @function showSlide
   * @param slideNumber
   * display a media slide in the lightbox
   */
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
      slideImg.setAttribute("alt", "");
    } else if (medias[slideNumber].video) {
      const mediaSrc = `assets/medias/${folderName}/${medias[slideNumber].video}`;
      slideVideo.style.display = "block";
      slideImg.style.display = "none";
      slideVideo.setAttribute("src", mediaSrc);
      slideVideo.setAttribute("title", "");
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

  /** @function showNextSlide
   * @param slideNumber
   * display the next media slide (or the first if the current one is the last)
   */
  function showNextSlide(slideNumber) {
    slideNumber === medias.length - 1
      ? showSlide(0)
      : showSlide(slideNumber + 1);
  }

  /** @function showPreviousSlide
   * @param slideNumber
   * display the previous media slide (or the last if the current one is the first)
   */
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
    // keyboard focus trap
    const firstFocusableElement = lightbox.querySelectorAll("button")[0]; // get first element to be focused inside modal
    const focusableContent = lightbox.querySelectorAll("button");
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener("keydown", (e) => {
      let isTabPressed = e.key === "Tab";
      if (!isTabPressed) {
        return;
      }
      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
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
