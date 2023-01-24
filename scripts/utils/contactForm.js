/**
 * @function displayModal {
 * display the contact modal
 */
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("main");

  // display the modal
  modal.style.display = "block";

  // accessiblity: hide the main content, show the modal
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");

  // accessibility: close contact modal with esc key
  window.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") {
        closeModal();
      }
    }
  });

  // keyboard focus trap
  const focusableElements = "button, input, textarea";
  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  const focusableContent = modal.querySelectorAll(focusableElements);
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

  // handle submission behavior
  document.querySelector("form").addEventListener("submit", (e) => {
    // stop the regular form behavior
    e.preventDefault();
    // log the inputs value
    [...document.querySelectorAll("form input")].forEach((field) =>
      console.log(`${field.getAttribute("name")}: ${field.value}`)
    );
    // log the textarea value
    console.log(
      `${document.querySelector("form textarea").getAttribute("name")}: ${
        document.querySelector("form textarea").value
      }`
    );
    // close the modal
    closeModal();
  });
}

/**
 * @function closeModal {
 * close the contact modal
 */
function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("main");
  // hide the modal
  modal.style.display = "none";
  // accessiblity: show the main content, hide the modal
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
}
