export const hamburger = () => {
  const hamburgerBtn = document.getElementById('js-hamburgerBtn');
  const header = document.getElementById('js-header');

  hamburgerBtn?.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('is-open');
    header.classList.toggle('is-open');
  })
}