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

const initNameInputMask = () => {
  const nameInputs = document.querySelectorAll('[data-name-mask]');
  for (const input of nameInputs) {
    input.addEventListener('input', () => {
      let value = input.value.replace(/[^a-zA-Zа-яА-Я]/g, '');

      if (value.length > 0) {
        value = value[0].toUpperCase() + value.slice(1).toLowerCase();
      }

      input.value = value;
    });
  }
};

const initPhoneInputMask = () => {
  const phoneInputs = document.querySelectorAll('[data-phone-mask]');
  for (const input of phoneInputs) {
    input.addEventListener('focus', () => {
      if (input.value) return;
      input.value = '+7';
    });

    input.addEventListener('blur', () => {
      if (input.value.length > 2) return;
      input.value = '';
    });

    input.addEventListener('input', () => {
      let x = input.value
        .replace(/\D/g, '')
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

      input.value = !x[2]
        ? '+7'
        : '+7 (' +
          x[2] +
          (x[3] ? ') ' + x[3] : '') +
          (x[4] ? '-' + x[4] : '') +
          (x[5] ? '-' + x[5] : '');
    });
  }
};

const initEmailInputMask = () => {
  const emailInputs = document.querySelectorAll('[data-email-mask]');
  for (const input of emailInputs) {
    input.addEventListener('input', () => {
      let value = input.value.toLowerCase();

      value = value.replace(/\s+/g, '').replace(/[^a-z0-9@._-]/g, '');

      input.value = value;
    });
  }
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

  // Add escape listener
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;

    const openedPopup = document.querySelector('.popup');
    if (!openedPopup) return;

    closePopup(openedPopup);
  });
};

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

const initInputMasks = () => {
  initNameInputMask();
  initPhoneInputMask();
  initEmailInputMask();
};

const initCallbackForm = () => {
  const callbackForm = document.getElementById('callback-form');
  if (!callbackForm) return;
  callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('callback-name');
    const phoneInput = document.getElementById('callback-phone');
    const emailInput = document.getElementById('callback-email');

    const name = nameInput?.value ?? '';
    const phone = phoneInput?.value ?? '';
    const email = emailInput?.value ?? '';

    console.log(name, phone, email);
  });
};

const onDOMLoaded = () => {
  try {
    initAutoScrollTexts();
  } catch (e) {
    console.error('Failed to initialize auto scroll texts', e);
  }

  try {
    initPopups();
  } catch (e) {
    console.error('Failed to initialize popups', e);
  }

  try {
    initInputMasks();
  } catch (e) {
    console.error('Failed to initialize input masks', e);
  }

  try {
    initCallbackForm();
  } catch (e) {
    console.error('Failed to initialize callback form', e);
  }
};

document.addEventListener('DOMContentLoaded', onDOMLoaded);
