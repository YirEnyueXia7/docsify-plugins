// 默认配置
var CONFIG = {
  auto: true,  // 是否自动显示/隐藏按钮
  fonts: { text: "Top", size: 17, lineheight: 36, },  // 按钮显示的文本,字号,行高
  borders: { width: 40, height: 40, radius: 7, right: 25, bottom: 35, },  // 按钮的宽度,高度,圆角;距离右侧,底部的像素值
  offset: 200,  //滚动多少像素后显示按钮
  colors: { light: "#42b983", dark: "#ea6f5a", },  // 亮暗主题颜色,vue=#42b983,dark=#ea6f5a,buble=#0074d9
};

var install = function (hook, vm) {
  var opts = vm.config.scrollToTop || CONFIG;
  CONFIG.auto = opts.auto && typeof opts.auto === "boolean" ? opts.auto : CONFIG.auto;
  CONFIG.fonts.text = opts.fonts && typeof opts.fonts === "object" && typeof opts.fonts.text === "string" ? opts.fonts.text : CONFIG.fonts.text;
  CONFIG.fonts.size = opts.fonts && typeof opts.fonts === "object" && typeof opts.fonts.size === "number" ? opts.fonts.size : CONFIG.fonts.size;
  CONFIG.fonts.lineheight = opts.fonts && typeof opts.fonts === "object" && typeof opts.fonts.lineheight === "number" ? opts.fonts.lineheight : CONFIG.fonts.lineheight;
  CONFIG.borders.width = opts.borders && typeof opts.borders === "object" && typeof opts.borders.width === "number" ? opts.borders.width : CONFIG.borders.width;
  CONFIG.borders.height = opts.borders && typeof opts.borders === "object" && typeof opts.borders.height === "number" ? opts.borders.height : CONFIG.borders.height;
  CONFIG.borders.radius = opts.borders && typeof opts.borders === "object" && typeof opts.borders.radius === "number" ? opts.borders.radius : CONFIG.borders.radius;
  CONFIG.borders.right = opts.borders && typeof opts.borders === "object" && typeof opts.borders.right === "number" ? opts.borders.right : CONFIG.borders.right;
  CONFIG.borders.bottom = opts.borders && typeof opts.borders === "object" && typeof opts.borders.bottom === "number" ? opts.borders.bottom : CONFIG.borders.bottom;
  CONFIG.offset = opts.offset && typeof opts.offset === "number" ? opts.offset : CONFIG.offset;
  CONFIG.colors.light = opts.colors && typeof opts.colors === "object" && typeof opts.colors.light === "string" ? opts.colors.light : CONFIG.colors.light;
  CONFIG.colors.dark = opts.colors && typeof opts.colors === "object" && typeof opts.colors.dark === "string" ? opts.colors.dark : CONFIG.colors.dark;
  var onScroll = function (e) {
    if (!CONFIG.auto) return;
    var offset = window.document.documentElement.scrollTop;
    var $scrollBtn = Docsify.dom.find("span.scroll-to-top");
    $scrollBtn.style.display = offset >= CONFIG.offset ? "block" : "none";
  };
  hook.mounted(function () {
    var scrollBtn = document.createElement("span");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.style.display = CONFIG.auto ? "none" : "block";
    scrollBtn.style.position = "fixed";
    scrollBtn.style.right = CONFIG.borders.right + "px";
    scrollBtn.style.bottom = CONFIG.borders.bottom + "px";
    scrollBtn.style.width = CONFIG.borders.width + "px";
    scrollBtn.style.height = CONFIG.borders.height + "px";
    scrollBtn.style.borderRadius = CONFIG.borders.radius + "px";
    scrollBtn.style.backdropFilter = "blur(4px)";
    scrollBtn.style.background = "transparent";
    // scrollBtn.style.border = "1px solid #ea6f5a";
    // scrollBtn.style.boxShadow = "0px 0px 6px #ea6f5a";
    scrollBtn.style.cursor = "pointer";
    // scrollBtn.style.overflow = "hidden";
    scrollBtn.style.fontSize = CONFIG.fonts.size + "px";
    scrollBtn.style.lineHeight = CONFIG.fonts.lineheight + "px";
    scrollBtn.style.textAlign = "center";
    // scrollBtn.style.color = "#ea6f5a";

    // 主题切换处理器
    const setColorScheme = (e) => {
      const isDark = e.matches;
      // const colors = isDark ? CONFIG.colors.dark : CONFIG.colors.light;
      scrollBtn.style.color = isDark ? CONFIG.colors.dark : CONFIG.colors.light;
      scrollBtn.style.border = isDark ? '1px solid' + CONFIG.colors.dark : '1px solid' + CONFIG.colors.light;
      scrollBtn.style.boxShadow = isDark ? '0px 0px 6px' + CONFIG.colors.dark : '0px 0px 6px' + CONFIG.colors.light;
    };
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addListener(setColorScheme);
    setColorScheme(colorSchemeQuery);
    scrollBtn.textContent = CONFIG.fonts.text;
    document.body.appendChild(scrollBtn);
    window.addEventListener("scroll", onScroll);
    scrollBtn.onclick = function (e) {
      e.stopPropagation();
      var step = window.scrollY / 15;
      var scroll = function () {
        window.scrollTo(0, window.scrollY - step);
        if (window.scrollY > 0) {
          setTimeout(scroll, 15);
        }
      };
      scroll();
    };
  });
};

$docsify.plugins = [].concat(install, $docsify.plugins);
