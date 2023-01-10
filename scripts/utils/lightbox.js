/**
 * @function setUpCarousel
 * @param carousel
 * set up the caroussel
 */
function setUpCarousel() {
  // function: return the correct next or previous slide number considering the total numver of slides
  function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
      result += mod;
    }
    return result;
  }
  // get elements
  const carousel = document.querySelector('[data-carousel]');
  const buttonPrevious = carousel.querySelector(
    '[data-carousel-button-previous]'
  );
  const buttonNext = carousel.querySelector('[data-carousel-button-next]');
  const slidesContainer = carousel.querySelector(
    '[data-carousel-slides-container]'
  );

  // carousel state
  let currentSlide = 0;
  const numSlides = slidesContainer.children.length;

  // function: next slide
  function handleNext() {
    currentSlide = modulo(currentSlide + 1, numSlides);
    changeSlide(currentSlide);
  }

  // function: previous slide
  function handlePrevious() {
    currentSlide = modulo(currentSlide - 1, numSlides);
    changeSlide(currentSlide);
  }

  // function: change slide
  function changeSlide(slideNumber) {
    // change current slide visually
    carousel.style.setProperty('--current-slide', slideNumber);

    // update the currentSlide variable
    currentSlide = slideNumber;

    // accessibility: hide the previous and next slides and unhide the current slide
    const previousSlideNumber = modulo(slideNumber - 1, numSlides);
    const nextSlideNumber = modulo(slideNumber + 1, numSlides);
    const previousSlide = slidesContainer.children[previousSlideNumber];
    const currentSlideElement = slidesContainer.children[slideNumber];
    const nextSlide = slidesContainer.children[nextSlideNumber];

    previousSlide.setAttribute('aria-hidden', true);
    nextSlide.setAttribute('aria-hidden', true);
    currentSlideElement.setAttribute('aria-hidden', false);
  }

  // set up events
  buttonPrevious.addEventListener('click', handlePrevious);
  buttonNext.addEventListener('click', handleNext);

  // accesibility : use keyboard keys to navigate though the slider or close it
  window.addEventListener('keydown', (e) => {
    if (carousel.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });

  // allow to use changeSlide function outside the setUpCarouel function
  setUpCarousel.changeSlide = changeSlide;
  setUpCarousel.handleNext = handleNext;
  setUpCarousel.handlePrevious = handlePrevious;
}

/**
 * @function displayLightbox
 * display the lightbox
 */
function displayLightbox() {
  const lightbox = document.querySelector('.carousel');
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  const firstInput = document.querySelector('form input');
  // display the lightbox
  lightbox.style.display = 'block';
  // accessiblity: hide the main content, show the lightbox
  main.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('aria-hidden', 'false');
  // disable the scrolling of the body
  body.classList.add('no-scroll');
  // accessibility: focus the first input
  firstInput.focus();
  // handle submission behavior
  onSubmit();
}

/**
 * @function closeLightbox {
 * close the lightbox
 */
function closeLightbox() {
  const lightbox = document.querySelector('.carousel');
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  // hide the lightbox
  lightbox.style.display = 'none';
  // accessiblity: show the main content, hide the lightbox
  main.setAttribute('aria-hidden', 'false');
  lightbox.setAttribute('aria-hidden', 'true');
  // enable the scrolling of the body
  body.classList.remove('no-scroll');
}
