// by deepseek
// docsify-plugin-textpopup.js
(function () {
  'use strict';

  const STYLE_ID = 'docsify-textpopup-style';
  const DEFAULT_CONFIG = {
    texts: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
    colors: ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#cc00ff'],
    fontSize: '16px',
    fontWeight: '400',
    duration: 850,
    translatey: '-80px',
  };

  const install = function (hook, vm) {
    let clickHandler = null;
    let styleElement = null;
    let activePopups = new Set();

    const getConfig = () => ({
      ...DEFAULT_CONFIG,
      ...(vm.config.textPopup || {})
    });

    const generateStyle = () => {
      const config = getConfig();
      return `
        [data-text-popup] {
          position: fixed;
          pointer-events: none;
          font-size: ${config.fontSize};
          font-weight: ${config.fontWeight};
          animation: docsify-text-popup-float ${config.duration}ms ease-out forwards;
          text-shadow: 1px 1px 3px hsla(0, 0%, 50%, 0.5);
          z-index: 9999;
          user-select: none !important;
        }
        
        @keyframes docsify-text-popup-float {
          0% { opacity: 0; transform: translateY(-15px); }
          5% { opacity: 1; }
          100% { opacity: 0; transform: translateY(${config.translatey}); }
        }
      `;
    };

    const injectStyle = () => {
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = STYLE_ID;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = generateStyle();
    };

    const createPopup = (text, color, x, y) => {
      const popup = document.createElement('div');
      popup.dataset.textPopup = '';
      popup.textContent = text;
      popup.style.color = color;
      popup.style.left = `${x}px`;
      popup.style.top = `${y}px`;
      return popup;
    };

    const initClickHandler = () => {
      if (clickHandler) return;

      clickHandler = (e) => {
        const config = getConfig();
        const popup = createPopup(
          config.texts[Math.floor(Math.random() * config.texts.length)],
          config.colors[Math.floor(Math.random() * config.colors.length)],
          e.clientX,
          e.clientY
        );

        document.body.appendChild(popup);
        activePopups.add(popup);

        setTimeout(() => {
          popup.remove();
          activePopups.delete(popup);
        }, config.duration);
      };

      document.addEventListener('click', clickHandler);
    };

    const cleanupPopups = () => {
      activePopups.forEach(popup => popup.remove());
      activePopups.clear();
    };

    // 修复：确保所有 hook 方法都存在
    hook.ready = hook.ready || function (cb) { cb(); };
    hook.beforeEach = hook.beforeEach || function (cb) { cb(); };

    hook.ready(() => {
      injectStyle();
      initClickHandler();
    });

    hook.beforeEach(cleanupPopups);

    // 修复：确保 destroy 方法存在
    if (typeof hook.destroy === 'function') {
      hook.destroy(() => {
        cleanupPopups();
        if (styleElement) styleElement.remove();
        if (clickHandler) {
          document.removeEventListener('click', clickHandler);
        }
      });
    }
  };

  // 安全的插件注册
  if (typeof window !== 'undefined') {
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = window.$docsify.plugins || [];
    window.$docsify.plugins.push(install);
  }
})();
