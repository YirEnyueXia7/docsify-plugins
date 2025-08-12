// 默认配置
var CONFIG = {
  auto: true,  // 是否自动显示/隐藏按钮
  fonts: { text: "Top", size: 17, lineheight: 36, },  // 按钮显示的文本,字号,行高
  borders: { width: 40, height: 40, radius: 7, right: 25, bottom: 35, },  // 按钮的宽度,高度,圆角;距离右侧,底部的像素值
  offset: 200,  //滚动多少像素后显示按钮
  colors: { light: "#42b983", dark: "#ea6f5a", },  // 亮暗主题颜色,vue=#42b983,dark=#ea6f5a,buble=#0074d9
};

// 插件安装函数
var install = function (hook, vm) {
  var opts = vm.config.scrollToTop || CONFIG;  // 合并用户配置和默认配置
  // 配置项类型安全检查与赋值
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
  // 滚动事件处理函数
  var onScroll = function (e) {
    if (!CONFIG.auto) return;  // 如果禁用自动显示，直接退出
    var offset = window.document.documentElement.scrollTop;  // 获取当前垂直滚动距离（兼容不同浏览器）
    var $scrollBtn = Docsify.dom.find("span.scroll-to-top");  // 查找DOM中已创建的按钮元素
    $scrollBtn.style.display = offset >= CONFIG.offset ? "block" : "none";  // 根据滚动位置切换显示/隐藏（block显示/none隐藏）
  };
  // 挂载插件
  hook.mounted(function () {
    // 创建按钮DOM元素
    var scrollBtn = document.createElement("span");  // 创建一个 <span> 元素作为"返回顶部"按钮
    scrollBtn.className = "scroll-to-top";  // 为按钮添加CSS类名（方便后续通过CSS选择器控制）
    scrollBtn.style.display = CONFIG.auto ? "none" : "block";  // 控制按钮初始显示状态,为true则默认隐藏(none),滚动到指定位置才显示
    // 背景框样式
    scrollBtn.style.position = "fixed";  // 固定定位（使按钮始终显示在视口中）
    scrollBtn.style.right = CONFIG.borders.right + "px";  // 设置按钮距离视口右侧的距离（使用CONFIG.right配置值）
    scrollBtn.style.bottom = CONFIG.borders.bottom + "px";  // 设置按钮距离视口底部的距离（使用CONFIG.bottom配置值）
    scrollBtn.style.width = CONFIG.borders.width + "px";  // 设置按钮宽度为50像素
    scrollBtn.style.height = CONFIG.borders.height + "px";  // 设置按钮高度为50像素（保持与宽度相同，形成正方形）
    scrollBtn.style.borderRadius = CONFIG.borders.radius + "px";  // 设置按钮圆角（4像素圆角，使边角变柔和）
    scrollBtn.style.backdropFilter = "blur(4px)";  // 添加毛玻璃效果（可选）
    scrollBtn.style.background = "transparent";  // 设置按钮背景颜色为白色
    // scrollBtn.style.border = "1px solid #ea6f5a";  // 设置按钮边框：1像素实线浅灰色(#ddd)
    // scrollBtn.style.boxShadow = "0px 0px 6px #ea6f5a";  // 添加轻微阴影效果（水平/垂直偏移0，模糊6px，浅灰色阴影）
    scrollBtn.style.cursor = "pointer";  // 
    // scrollBtn.style.overflow = "hidden";  // 隐藏溢出内容（确保按钮内容不会超出设定尺寸）
    // 文字样式
    scrollBtn.style.fontSize = CONFIG.fonts.size + "px";  // 设置文字大小为16像素
    scrollBtn.style.lineHeight = CONFIG.fonts.lineheight + "px";  // 设置行高（垂直居中文字，50px高度-上下各4px边框=42px）
    scrollBtn.style.textAlign = "center";  // 设置文字水平居中
    // scrollBtn.style.color = "#ea6f5a";  // 设置按钮文字颜色为深灰色(#666)

    // 主题切换处理器
    const setColorScheme = (e) => {
      const isDark = e.matches;  // 检测当前是否暗色模式
      // const colors = isDark ? CONFIG.colors.dark : CONFIG.colors.light;
      scrollBtn.style.color = isDark ? CONFIG.colors.dark : CONFIG.colors.light;  // 文字颜色
      scrollBtn.style.border = isDark ? '1px solid' + CONFIG.colors.dark : '1px solid' + CONFIG.colors.light;  // 边框样式（1px实线）
      scrollBtn.style.boxShadow = isDark ? '0px 0px 6px' + CONFIG.colors.dark : '0px 0px 6px' + CONFIG.colors.light;  // 阴影样式（1px实线）
    };
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');// 初始化主题监听
    colorSchemeQuery.addListener(setColorScheme); // 监听主题变化
    setColorScheme(colorSchemeQuery); // 首次加载时设置

    scrollBtn.textContent = CONFIG.fonts.text;  // 插入文本内容
    document.body.appendChild(scrollBtn);  // 将按钮添加到文档末尾
    window.addEventListener("scroll", onScroll);  // 监听滚动事件
    // 按钮点击事件：平滑滚动到顶部
    scrollBtn.onclick = function (e) {
      e.stopPropagation();  // 阻止事件冒泡
      var step = window.scrollY / 15;  // 计算滚动步长（基于当前滚动位置）
      // 递归实现平滑滚动动画
      var scroll = function () {
        window.scrollTo(0, window.scrollY - step);  // 向上移动
        if (window.scrollY > 0) {
          setTimeout(scroll, 15);  // 递归调用实现动画效果
        }
      };
      scroll();
    };
  });
};

$docsify.plugins = [].concat(install, $docsify.plugins);  // 注册插件