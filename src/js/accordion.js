export const accordion = () => {
  const trigger = document.querySelectorAll('.c-accordion__title');
  const content = document.querySelectorAll('.c-accordion__content');

  for (let i = 0; i < trigger.length; i++) {
    let triggerEach = trigger[i];
    let contentEach = content[i];

    triggerEach.addEventListener('click', () => {
      triggerEach.classList.toggle('is-open');
      contentEach.classList.toggle('is-open');
    });
  }
};