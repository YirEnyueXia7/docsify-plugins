(function () {
  'use strict';
  const STYLE_ID = 'docsify-textpopup-style';
  const DEFAULT_CONFIG = {
    texts: ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'],
    colors: ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#cc00ff'],
    fontSize: '16px',
    fontWeight: '400',
    duration: 750,
    translatey: '-70px',
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
      const config = getConfig(); // 直接获取当前配置
      return `
        [data-text-popup] {
          position: fixed;
          pointer-events: none;
          font-size: ${config.fontSize};
          font-weight: ${config.fontWeight};
          animation: docsify-text-popup-float ${config.duration}ms ease-out forwards;
          text-shadow: 1px 1px 3px hsla(0, 0%, 50%, 0.5);
          z-index: 9999;
          /* 不可选中强化 */
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        @keyframes docsify-text-popup-float {
          0% { opacity: 0; }
          5% { opacity: 1; }
          100% { opacity: 0; transform: translateY(${config.translatey}); }
        }
      `;
    };
    const injectStyle = () => {
      const config = getConfig();
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = STYLE_ID;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = generateStyle(config.fontSize, config.fontWeight);
    };
    const createPopup = (text, color, x, y) => {
      const popup = document.createElement('div');
      popup.dataset.textPopup = '';
      popup.textContent = text;
      popup.style.color = color;
      popup.style.left = `${x}px`;
      popup.style.top = `${y}px`;
      popup.setAttribute('unselectable', 'on');
      popup.onselectstart = () => false;
      return popup;
    };
    const initClickHandler = () => {
      if (clickHandler) return;
      clickHandler = (e) => {
        const config = getConfig();
        const { texts, colors } = config;
        const popup = createPopup(
          texts[Math.floor(Math.random() * texts.length)],
          colors[Math.floor(Math.random() * colors.length)],
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
    hook.ready(() => {
      injectStyle();
      initClickHandler();
    });
    hook.beforeEach(cleanupPopups);
    hook.destroy(() => {
      cleanupPopups();
      if (styleElement) styleElement.remove();
      if (clickHandler) {
        document.removeEventListener('click', clickHandler);
        clickHandler = null;
      }
    });
  };
  if (typeof window.$docsify === 'object') {
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(install);
  } else {
    window.$docsify = { plugins: [install] };
  }
})();