# docsify-plugins-scroll-to-top

**Note**: This repository is a modified version of [KiKi/docsify-scroll-to-top](https://gitee.com/zhengxiangqi/docsify-scroll-to-top), **not** the official release. 
**Key changes**: 
- Added: Light/dark theme support 
- Removed: Original theme 
- Optimized: New theme implementation 


### Usage
1. Include the script in index.html:
  ``` html
  <script src="./scroll-to-top.js"></script>
  ```
2. Configure the plugin (optional):
   ```
   // 返回顶部
    scrollToTop: {
        auto: true,  // 是否自动显示/隐藏按钮
        fonts: { text: "Top", size: 16, lineheight: 36, },  // 按钮显示的文本,字号,行高
        borders: { width: 40, height: 40, radius: 5, right: 25, bottom: 35, },  // 按钮的宽度,高度,圆角;距离右侧,底部的像素值
        offset: 200,  //滚动多少像素后显示按钮
        colors: { light: "#42b983", dark: "#ea6f5a", },  // 亮暗主题颜色
    },
   ```
