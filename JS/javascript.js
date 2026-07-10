const cards = document.querySelectorAll('.quadro');
const modal = document.getElementById('artModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalAuthor = document.getElementById('modalAuthor');
const modalImage = document.querySelector('.modal__image');
const closeButtons = document.querySelectorAll('[data-close-modal]');

function openModal(card) {
    modalTitle.textContent = card.dataset.title || 'Título da arte';
    modalDescription.textContent = card.dataset.description || 'Descrição da obra.';
    modalAuthor.textContent = `Autor: ${card.dataset.author || 'Equipe do projeto'}`;
    modalImage.style.background = card.dataset.image || 'linear-gradient(135deg, #ffefcc 0%, #ffb25f 100%)';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(card);
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
});

modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.hasAttribute('data-close-modal')) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});