export const modal = () => {
  const modalTrigger = document.querySelectorAll(".js-modalTrigger");
  modalTrigger.forEach(function (trigger) {
    trigger?.addEventListener('click', () => {
      const modal = trigger.getAttribute('data-modal');
      document.getElementById(modal).classList.toggle('is-open');
    })
  });

  const closeTrigger = document.querySelectorAll(".js-modalClose");
  closeTrigger.forEach(function (trigger) {
    trigger?.addEventListener('click', () => {
      const modal = trigger.closest('.c-modal');
      modal.classList.toggle('is-open');
    })
  });
};
