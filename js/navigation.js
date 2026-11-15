
/**
 * Initializes the mobile navigation.
 *
 * Registers the toggle event and synchronizes
 * the visible menu with its accessibility state.
 *
 * @returns {void}
 */
export function initNavigation() {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__list');

  if (!toggle || !menu) return;

  /**
   * Updates the mobile navigation state.
   *
   * @param {boolean} isOpen - Whether the menu is open.
   * @returns {void}
   */
  function setMenuOpen(isOpen) {
    menu.classList.toggle('nav__list--open', isOpen);

    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    setMenuOpen(!isOpen);
  });

  // Close the mobile menu after selecting a link.
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) {
      setMenuOpen(false);
    }
  });
}
