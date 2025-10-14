/**
 * Mobile Menu Module
 * Встраиваемый модуль мобильного меню для WFM
 */
(function() {
  'use strict';

  // Конфигурация меню
  const config = {
    logoSrc: 'img/logo.png',
    menuIconSrc: 'img/menu.png',
    closeIconSrc: 'img/x.png',
    menuItems: [
      { text: 'Funding Solutions', href: '#funding-solutions' },
      { text: 'How It Works', href: '#how-it-works' },
      { text: 'Industries We Serve', href: '#industries' },
      { text: 'Blog', href: '#blog' },
      { text: 'FAQ', href: '#faq' },
      { text: 'About Us', href: '#about' }
    ],
    contactEmail: 'contact@wefundmerchants.com',
    socialLinks: [
      { icon: 'img/fb.png', href: 'https://facebook.com', alt: 'Facebook' },
      { icon: 'img/inst.png', href: 'https://instagram.com', alt: 'Instagram' },
      { icon: 'img/x.png', href: 'https://twitter.com', alt: 'X (Twitter)' },
      { icon: 'img/ln.png', href: 'https://linkedin.com', alt: 'LinkedIn' }
    ]
  };

  // Стили для меню
  const styles = `
    .wfm-mobile-menu {
      font-family: inherit;
      position: relative;
      z-index: 9999;
      font-size: 16px;
      color: #01286D;
    }

    .wfm-mobile-header {
      background: #ffffff;
      border: 1px solid #A1D7EE;
      border-radius: 42px;
      height: 63px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10001;
    }

    .wfm-mobile-header__logo {
      width: 140px;
      height: auto;
    }

    .wfm-mobile-header__toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .wfm-mobile-header__toggle:hover {
      transform: scale(1.05);
    }

    .wfm-mobile-header__toggle img {
      width: 53px;
      height: auto;
      display: block;
    }

    .wfm-mobile-overlay {
      position: absolute;
      top: 26px;
      left: 0;
      right: 0;
      padding-top: 63px;
      background: #ffffff;
      border: 1px solid #A1D7EE;
      border-radius: 42px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: none;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-100%);
      transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .wfm-mobile-overlay.is-open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .wfm-mobile-overlay__inner {
      height: 100%;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
    }

    .wfm-mobile-overlay__header {
      display: none; /* Скрываем дублирующий хедер в дропдауне */
    }

    .wfm-mobile-overlay__logo {
      display: none;
    }

    .wfm-mobile-overlay__close {
      display: none;
    }

    .wfm-mobile-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .wfm-mobile-nav__list {
      list-style: none;
      margin: 0;
      padding: 0;
      margin-bottom: 40px;
    }

    .wfm-mobile-nav__item {
      margin-bottom: 10px;
    }

    .wfm-mobile-nav__link {
      display: block;
      padding: 0;
      color: #01286D;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      transition: color 0.3s ease, padding-left 0.3s ease;
    }

    .wfm-mobile-cta {
      margin: 20px 0;
    }

    .wfm-mobile-cta__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #01286D;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 47px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
      gap: 10px;
    }

    .wfm-mobile-cta__button:hover {
      background: #003d7a;
      transform: translateX(2px);
    }

    .wfm-mobile-cta__arrow {
      width: 23px;
      height: 15px;
      transition: transform 0.3s ease;
    }

    .wfm-mobile-cta__button:hover .wfm-mobile-cta__arrow {
      transform: translateX(3px);
    }

    .wfm-mobile-contact {
      margin-bottom: 20px;
    }

    .wfm-mobile-contact__email {
      color: #01286D;
      text-decoration: none;
      font-size: 16px;
      font-weight: 300;
      transition: color 0.3s ease;
    }

    .wfm-mobile-social {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .wfm-mobile-social__link {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }

    .wfm-mobile-social__link:hover {
      transform: translateY(-2px);
    }

    .wfm-mobile-social__icon {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }


    /* Анимация появления элементов меню */
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item {
      animation: slideInLeft 0.4s ease forwards;
      opacity: 0;
    }

    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(1) { animation-delay: 0.1s; }
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(2) { animation-delay: 0.15s; }
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(3) { animation-delay: 0.2s; }
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(4) { animation-delay: 0.25s; }
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(5) { animation-delay: 0.3s; }
    .wfm-mobile-overlay.is-open .wfm-mobile-nav__item:nth-child(6) { animation-delay: 0.35s; }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Адаптивность для планшетов и больших экранов */
    @media (min-width: 768px) {
      .wfm-mobile-menu {
        display: none; /* Скрываем мобильное меню на больших экранах */
      }
    }
  `;

  // Класс мобильного меню
  class MobileMenu {
    constructor(containerSelector) {
      this.container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;

      if (!this.container) {
        console.error('WFM Mobile Menu: Container not found');
        return;
      }

      this.isOpen = false;
      this.init();
    }

    init() {
      this.injectStyles();
      this.createMenuStructure();
      this.bindEvents();
    }

    injectStyles() {
      const styleElement = document.createElement('style');
      styleElement.id = 'wfm-mobile-menu-styles';
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }

    createMenuStructure() {
      // Создаем контейнер меню
      const menuWrapper = document.createElement('div');
      menuWrapper.className = 'wfm-mobile-menu';

      // Создаем хедер с логотипом и кнопкой
      menuWrapper.innerHTML = `
        <div class="wfm-mobile-header">
          <img src="${config.logoSrc}" alt="WFM Logo" class="wfm-mobile-header__logo">
          <button class="wfm-mobile-header__toggle" aria-label="Open menu">
            <img src="${config.menuIconSrc}" alt="Menu">
          </button>
        </div>
      `;

      // Создаем оверлей с меню
      const overlay = document.createElement('div');
      overlay.className = 'wfm-mobile-overlay';

      const overlayInner = document.createElement('div');
      overlayInner.className = 'wfm-mobile-overlay__inner';

      // Шапка оверлея
      const overlayHeader = document.createElement('div');
      overlayHeader.className = 'wfm-mobile-overlay__header';
      overlayHeader.innerHTML = `
        <img src="${config.logoSrc}" alt="WFM Logo" class="wfm-mobile-overlay__logo">
        <button class="wfm-mobile-overlay__close" aria-label="Close menu">
          <img src="${config.closeIconSrc}" alt="Close">
        </button>
      `;

      // Навигация
      const nav = document.createElement('nav');
      nav.className = 'wfm-mobile-nav';

      const navList = document.createElement('ul');
      navList.className = 'wfm-mobile-nav__list';

      config.menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'wfm-mobile-nav__item';

        const link = document.createElement('a');
        link.className = 'wfm-mobile-nav__link';
        link.href = item.href;
        link.textContent = item.text;

        li.appendChild(link);
        navList.appendChild(li);
      });

      nav.appendChild(navList);

      // CTA кнопка
      const cta = document.createElement('div');
      cta.className = 'wfm-mobile-cta';
      cta.innerHTML = `
        <a href="#apply" class="wfm-mobile-cta__button">
          Apply Now
          <img src="img/arrow.png" alt="Arrow" class="wfm-mobile-cta__arrow">
        </a>
      `;

      // Контакты
      const contact = document.createElement('div');
      contact.className = 'wfm-mobile-contact';
      contact.innerHTML = `
        <a href="mailto:${config.contactEmail}" class="wfm-mobile-contact__email">
          ${config.contactEmail}
        </a>
      `;

      // Социальные сети
      const social = document.createElement('div');
      social.className = 'wfm-mobile-social';

      config.socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.className = 'wfm-mobile-social__link';
        socialLink.href = link.href;
        socialLink.target = '_blank';
        socialLink.rel = 'noopener noreferrer';
        socialLink.setAttribute('aria-label', link.alt);

        const icon = document.createElement('img');
        icon.className = 'wfm-mobile-social__icon';
        icon.src = link.icon;
        icon.alt = link.alt;

        socialLink.appendChild(icon);
        social.appendChild(socialLink);
      });

      // Собираем всё вместе
      nav.appendChild(cta);
      overlayInner.appendChild(overlayHeader);
      overlayInner.appendChild(nav);
      overlayInner.appendChild(contact);
      overlayInner.appendChild(social);
      overlay.appendChild(overlayInner);

      // Добавляем overlay в menuWrapper
      menuWrapper.appendChild(overlay);

      // Добавляем в контейнер
      this.container.appendChild(menuWrapper);

      // Сохраняем ссылки на элементы
      this.menuToggle = menuWrapper.querySelector('.wfm-mobile-header__toggle');
      this.menuClose = overlay.querySelector('.wfm-mobile-overlay__close');
      this.overlay = overlay;
      this.navLinks = overlay.querySelectorAll('.wfm-mobile-nav__link');
    }

    bindEvents() {
      // Открытие/закрытие меню
      this.menuToggle.addEventListener('click', () => {
        if (this.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      });

      // Закрытие по клику на ссылку
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });

      // Закрытие по Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });

      // Закрытие по клику вне меню
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.container.contains(e.target)) {
          this.closeMenu();
        }
      });
    }

    openMenu() {
      this.isOpen = true;
      this.overlay.classList.add('is-open');
    }

    closeMenu() {
      this.isOpen = false;
      this.overlay.classList.remove('is-open');
    }

    // Публичный API
    destroy() {
      // Удаляем стили
      const styleElement = document.getElementById('wfm-mobile-menu-styles');
      if (styleElement) {
        styleElement.remove();
      }

      // Удаляем меню
      if (this.container) {
        this.container.innerHTML = '';
      }

      // Удаляем оверлей
      if (this.overlay) {
        this.overlay.remove();
      }

      // Очищаем body
      document.body.classList.remove('wfm-menu-open');
      document.body.style.top = '';
    }

    // Обновление конфигурации
    updateConfig(newConfig) {
      Object.assign(config, newConfig);
      this.destroy();
      this.init();
    }
  }

  // Экспорт модуля
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenu;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return MobileMenu;
    });
  } else {
    window.WFMMobileMenu = MobileMenu;
  }

})();

