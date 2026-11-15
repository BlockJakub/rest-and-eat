
/**
 * Initializes Bento menu interactions.
 *
 * Sets up accessible card selection and scroll reveal.
 *
 * @returns {void} Nothing.
 */
export function initMenuAnimations() {
  const cards = document.querySelectorAll('.menu-card');

  if (cards.length === 0) return;

  initCardSelection(cards);
  initScrollReveal(cards);
}

/**
 * Adds accessible highlight buttons to menu cards.
 *
 * Buttons are created only when JavaScript runs.
 *
 * @param {NodeListOf<Element>} cards - Menu cards.
 * @returns {void} Nothing.
 */
function initCardSelection(cards) {
  for (const card of cards) {
    const content = card.querySelector('.menu-card__content');
    const title = card.querySelector('.menu-card__title');

    if (!content || !title) continue;

    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'menu-card__action';
    button.textContent = 'Highlight dish';

    button.setAttribute('aria-pressed', 'false');
    button.setAttribute(
      'aria-label',
      `Highlight dish: ${title.textContent.trim()}`
    );

    button.addEventListener('click', handleCardSelection);

    content.append(button);
  }
}

/**
 * Toggles the selected menu card.
 *
 * Ensures only one card is highlighted at a time.
 *
 * @param {MouseEvent} event - Button click event.
 * @returns {void} Nothing.
 */
function handleCardSelection(event) {
  const button = event.currentTarget;
  const card = button.closest('.menu-card');
  const grid = button.closest('.menu__grid');

  if (!card || !grid) return;

  const shouldSelect = !card.classList.contains(
    'menu-card--selected'
  );

  // Reset existing selections before applying a new one.
  for (const otherCard of grid.querySelectorAll('.menu-card')) {
    setCardSelection(otherCard, false);
  }

  if (shouldSelect) {
    setCardSelection(card, true);
  }
}


/**
 * Updates a menu card's visual and accessible state.
 *
 * Keeps the button label stable while aria-pressed
 * communicates its selected or unselected state.
 *
 * @param {Element} card - Menu card to update.
 * @param {boolean} selected - Desired selection state.
 * @returns {void} Nothing.
 */
function setCardSelection(card, selected) {
  const button = card.querySelector('.menu-card__action');

  if (!button) return;

  card.classList.toggle('menu-card--selected', selected);

  button.setAttribute('aria-pressed', String(selected));
}


/**
 * Initializes reveal animations for visible menu cards.
 *
 * Uses IntersectionObserver to avoid continuous
 * scroll-position calculations.
 *
 * @param {NodeListOf<Element>} cards - Menu cards.
 * @returns {void} Nothing.
 */
function initScrollReveal(cards) {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    reducedMotion ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }

  const observer = new IntersectionObserver(
    handleCardReveal,
    {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    }
  );

  for (const card of cards) {
    card.classList.add('menu-card--reveal-pending');
    observer.observe(card);
  }
}

/**
 * Reveals intersecting cards and stops observing them.
 *
 * @param {IntersectionObserverEntry[]} entries
 *   Observed visibility changes.
 * @param {IntersectionObserver} observer
 *   Observer responsible for the changes.
 * @returns {void} Nothing.
 */
function handleCardReveal(entries, observer) {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    entry.target.classList.remove(
      'menu-card--reveal-pending'
    );

    observer.unobserve(entry.target);
  }
}
