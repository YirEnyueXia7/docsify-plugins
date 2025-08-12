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
   // formatUpdated+words-count
    timeUpdater: {
        text: "<div align='right' width='200px' style='color:gray;font-size:13px'>{words-count}字&emsp;|&emsp;最后更新于:&ensp;{docsify-updated}</div>",
        // formatUpdated: "{YYYY} 年 {MM} 月 {DD} 日",
        // formatUpdated: "{YYYY}/{MM}/{DD}",
        formatUpdated: "{YYYY}-{MM}-{DD} {HH}:{mm}",
        whereToPlace: "top"  // "top" or "bottom", default to "bottom"
    },
   ```
