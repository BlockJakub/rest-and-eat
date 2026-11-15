
/**
 * Activates menu-card reveal and selection behaviours.
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
 * Creates accessible buttons for highlighting dishes.
 * Buttons exist only when JavaScript is available.
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
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute(
      'aria-label',
      `Highlight ${title.textContent.trim()}`
    );
    button.textContent = 'Highlight dish';

    button.addEventListener('click', handleCardSelection);
    content.append(button);
  }
}

/**
 * Handles selecting or deselecting a menu card.
 * Only one card may be highlighted at a time.
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

  // Reset previous selections before choosing a new card.
  for (const otherCard of grid.querySelectorAll('.menu-card')) {
    setCardSelection(otherCard, false);
  }

  if (shouldSelect) {
    setCardSelection(card, true);
  }
}

/**
 * Synchronizes a card's appearance and button state.
 *
 * @param {Element} card - Card to update.
 * @param {boolean} selected - Whether the card is selected.
 * @returns {void} Nothing.
 */
function setCardSelection(card, selected) {
  const button = card.querySelector('.menu-card__action');

  if (!button) return;

  card.classList.toggle('menu-card--selected', selected);

  button.setAttribute('aria-pressed', String(selected));
  button.textContent = selected
    ? 'Highlighted'
    : 'Highlight dish';
}

/**
 * Reveals menu cards when they enter the viewport.
 *
 * Uses IntersectionObserver instead of continuous
 * scroll events to avoid unnecessary calculations.
 *
 * @param {NodeListOf<Element>} cards - Cards to observe.
 * @returns {void} Nothing.
 */
function initScrollReveal(cards) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Preserve visible content when motion is reduced
  // or the browser does not support IntersectionObserver.
  if (
    prefersReducedMotion ||
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
 * Reveals visible cards and stops watching them.
 *
 * @param {IntersectionObserverEntry[]} entries
 *   Visibility information for observed elements.
 * @param {IntersectionObserver} observer
 *   The active IntersectionObserver instance.
 * @returns {void} Nothing.
 */
function handleCardReveal(entries, observer) {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    entry.target.classList.remove(
      'menu-card--reveal-pending'
    );

    // Each card only needs to reveal once.
    observer.unobserve(entry.target);
  }
}
