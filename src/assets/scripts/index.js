const initAutoScrollTexts = () => {
  const triggers = document.querySelectorAll('.auto-scroll-text-trigger');
  for (const trigger of triggers) {
    const container = trigger.querySelector('.auto-scroll-text-container');
    if (!container) continue;

    const text = container.querySelector('.auto-scroll-text');
    if (!text) continue;

    const duplicateText = text.cloneNode(true);
    duplicateText.classList.add('duplicate');

    container.append(duplicateText);

    trigger.addEventListener('mouseenter', () =>
      container.classList.add('auto-scroll-text--active')
    );

    trigger.addEventListener('mouseleave', () =>
      container.classList.remove('auto-scroll-text--active')
    );
  }
};

const openPopup = (popup) => {
  if (!popup) return;
  popup.classList.add('popup--active');
  requestAnimationFrame(() => popup.classList.add('popup--showed'));
};

const closePopup = (popup) => {
  if (!popup) return;
  popup.classList.remove('popup--showed');

  const transitionDuration =
    parseFloat(getComputedStyle(popup).transitionDuration) * 1000 || 300;
  setTimeout(() => popup.classList.remove('popup--active'), transitionDuration);
};

const initPopups = () => {
  // Init popup close buttons
  const closeButtons = document.querySelectorAll('[data-close-popup]');
  for (const close of closeButtons) {
    close.addEventListener('click', () => {
      const popupId = close.dataset.closePopup;
      const popup = document.getElementById(popupId);
      if (!popup) return;

      closePopup(popup);
    });
  }

  // Init popup triggers
  const popupTriggers = document.querySelectorAll('[data-popup-id]');
  for (const trigger of popupTriggers) {
    const popupId = trigger.dataset.popupId;
    const popup = document.getElementById(popupId);
    if (!popup) return;

    trigger.addEventListener('click', () => openPopup(popup));
  }
};

const onDOMLoaded = () => {
  initAutoScrollTexts();
  initPopups();
};

document.addEventListener('DOMContentLoaded', onDOMLoaded);
