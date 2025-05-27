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

    trigger.addEventListener('mouseenter', (e) =>
      container.classList.add('auto-scroll-text--active')
    );

    trigger.addEventListener('mouseleave', (e) =>
      container.classList.remove('auto-scroll-text--active')
    );
  }
};

const onDOMLoaded = () => {
  initAutoScrollTexts();
};

document.addEventListener('DOMContentLoaded', onDOMLoaded);
