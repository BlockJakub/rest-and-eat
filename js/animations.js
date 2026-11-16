
/**
 * Initializes Bento menu interactions.
 *
 * Creates selection buttons and enables
 * scroll reveal animations.
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

  // Reset other cards before applying a new selection.
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
 * Keeps the accessible button label stable while
 * aria-pressed communicates the current state.
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
 * Initializes scroll reveal animations.
 *
 * Uses IntersectionObserver to avoid continuous
 * scroll calculations for menu cards.
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
 * Reveals intersecting menu cards once.
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
 * Initializes shared scroll scheduling for independent
 * Hero and Featured Dish background parallax effects.
 *
 * Both effects use one scroll listener and one
 * requestAnimationFrame scheduling mechanism.
 *
 * @returns {void} Nothing.
 */
export function initPageParallax() {
  const hero = document.querySelector('.hero');
  const feature = document.querySelector('.feature');

  if (
    typeof window.requestAnimationFrame !== 'function' ||
    typeof window.matchMedia !== 'function'
  ) {
    return;
  }

  // Each section retains its own motion configuration.
  const effects = [
    {
      section: hero,
      background: hero?.querySelector(
        '.hero__background'
      ),
      speed: 0.18,
      minOffset: 0,
      maxOffset: 64,
      mode: 'hero'
    },
    {
      section: feature,
      background: feature?.querySelector(
        '.feature__background'
      ),
      speed: 0.16,
      minOffset: -64,
      maxOffset: 64,
      mode: 'centered'
    }
  ].filter(effect => effect.section && effect.background);

  if (effects.length === 0) return;

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let frameRequested = false;

  /**
   * Calculates and renders visible parallax effects.
   *
   * Only visible sections receive transform updates.
   * Each section uses its own speed and movement limits.
   *
   * @returns {void} Nothing.
   */
  function renderParallax() {
    frameRequested = false;

    if (reducedMotion.matches) return;

    const viewportHeight = window.innerHeight;

    for (const effect of effects) {
      const rect = effect.section.getBoundingClientRect();

      // Skip effects that are outside the viewport.
      if (
        rect.bottom <= 0 ||
        rect.top >= viewportHeight
      ) {
        continue;
      }

      let rawOffset;

      if (effect.mode === 'hero') {
        // Preserve the original Hero motion formula.
        rawOffset = -rect.top * effect.speed;
      } else {
        // Center the Featured Dish motion around
        // the vertical center of the viewport.
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        rawOffset =
          (viewportCenter - sectionCenter) * effect.speed;
      }

      // Prevent either image from exceeding its safe range.
      const offset = Math.max(
        effect.minOffset,
        Math.min(effect.maxOffset, rawOffset)
      );

      effect.background.style.transform =
        `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }
  }

  /**
   * Schedules one parallax rendering frame.
   *
   * Repeated scroll events do not create additional
   * frames while one is already scheduled.
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
   * Handles changes to reduced-motion preferences.
   *
   * Removes inline transforms so the static
   * CSS fallback remains authoritative.
   *
   * @returns {void} Nothing.
   */
  function handleMotionPreferenceChange() {
    if (reducedMotion.matches) {
      for (const effect of effects) {
        effect.background.style.removeProperty('transform');
      }

      return;
    }

    scheduleParallaxUpdate();
  }

  // Only one global scroll listener manages both sections.
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
  } else if (typeof reducedMotion.addListener === 'function') {
    // Compatibility fallback for older browser engines.
    reducedMotion.addListener(handleMotionPreferenceChange);
  }

  // Initialize effects for the current viewport position.
  handleMotionPreferenceChange();
}
