function displayModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  const firstInput = document.querySelector('form input');
  // display the modal
  modal.style.display = 'block';
  // accessiblity: hide the main content, show the modal
  main.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  // accessibility: focus the first input
  firstInput.focus();
  // handle submission behavior
  onSubmit();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const body = document.querySelector('body');
  const main = document.querySelector('main');
  // hide the modal
  modal.style.display = 'none';
  // accessiblity: show the main content, hide the modal
  main.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
}

/**
 * @function onSubmit {
 * handle the form submission
 */
function onSubmit() {
  // when the form is submitted...
  document.querySelector('form').addEventListener('submit', (e) => {
    // stop the regular form behavior
    e.preventDefault();
    // log the inputs value
    [...document.querySelectorAll('form input')].forEach((field) =>
      console.log(`${field.getAttribute('name')}: ${field.value}`)
    );
    // log the textarea value
    console.log(
      `${document.querySelector('form textarea').getAttribute('name')}: ${
        document.querySelector('form textarea').value
      }`
    );
    // close the modal
    closeModal();
  });
}
