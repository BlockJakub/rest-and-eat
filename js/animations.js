
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



/**
 * Initializes scroll-linked parallax for the Hero.
 *
 * Uses requestAnimationFrame to limit visual updates
 * to browser rendering frames.
 *
 * @returns {void} Nothing.
 */
export function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const background = hero?.querySelector(
    '.hero__background'
  );

  if (
    !hero ||
    !background ||
    typeof window.requestAnimationFrame !== 'function' ||
    typeof window.matchMedia !== 'function'
  ) {
    return;
  }

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let frameRequested = false;

  /**
   * Updates the background position within safe limits.
   *
   * Reading the Hero rectangle once per animation
   * frame avoids repeated layout calculations.
   *
   * @returns {void} Nothing.
   */
  function renderParallax() {
    frameRequested = false;

    if (reducedMotion.matches) {
      background.style.removeProperty('transform');
      return;
    }

    const rect = hero.getBoundingClientRect();

    // No animation work is needed while Hero is offscreen.
    if (
      rect.bottom <= 0 ||
      rect.top >= window.innerHeight
    ) {
      return;
    }

    const offset = Math.min(
      64,
      Math.max(0, -rect.top * 0.18)
    );

    background.style.transform =
      `translate3d(0, ${offset}px, 0)`;
  }

  /**
   * Schedules one rendering update.
   *
   * Multiple scroll events share a single animation
   * frame rather than causing duplicate updates.
   *
   * @returns {void} Nothing.
   */
  function scheduleParallaxUpdate() {
    if (frameRequested || reducedMotion.matches) {
      return;
    }

    frameRequested = true;

    window.requestAnimationFrame(renderParallax);
  }

  /**
   * Reacts to changes in the reduced-motion preference.
   *
   * @returns {void} Nothing.
   */
  function handleMotionPreferenceChange() {
    if (reducedMotion.matches) {
      background.style.removeProperty('transform');
      return;
    }

    scheduleParallaxUpdate();
  }

  window.addEventListener(
    'scroll',
    scheduleParallaxUpdate,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    scheduleParallaxUpdate
  );

  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener(
      'change',
      handleMotionPreferenceChange
    );
  }

  scheduleParallaxUpdate();
}
