document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  function buildModal(text = 'Arte', imageSrc = '') {
    const overlay = document.createElement('div');
    overlay.className = 'simple-modal-overlay';

    const imgBlock = imageSrc ? `<div class="simple-modal-frame"><img src="${imageSrc}" alt="${text}"></div>` : '';

    overlay.innerHTML = `
      <div class="simple-modal-box" role="dialog" aria-modal="true">
        <button class="simple-modal-close" aria-label="Fechar">×</button>
        ${imgBlock}
        <p class="simple-modal-desc">${text}</p>
      </div>`;

    body.appendChild(overlay);

    // trigger enter transition
    requestAnimationFrame(() => overlay.classList.add('open'));

    const close = overlay.querySelector('.simple-modal-close');
    const onKey = (e) => { if (e.key === 'Escape') remove(); };
    const remove = () => {
      document.removeEventListener('keydown', onKey);
      overlay.classList.remove('open');
      // wait for fade-out transition then remove
      const handler = (ev) => {
        if (ev.target === overlay) {
          overlay.removeEventListener('transitionend', handler);
          overlay.remove();
        }
      };
      overlay.addEventListener('transitionend', handler);
    };

    close.addEventListener('click', remove);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) remove(); });
    document.addEventListener('keydown', onKey);
  }

  document.querySelectorAll('.quadro').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const text = card.querySelector('p')?.textContent || 'Arte';
      const imageSrc = card.querySelector('img')?.src || card.dataset.image || '';
      buildModal(text, imageSrc);
    });
  });
});