# docsify-plugins-time-count-updater

**Note**: This repository is a modified version of [pfeak/docsify-updated]([https://gitee.com/zhengxiangqi/docsify-scroll-to-top](https://github.com/pfeak/docsify-updated)), **not** the official release. 
**Key changes**: 
- Added: word count, **Source**: implemented based on code from [827652549/docsify-count](https://github.com/827652549/docsify-count) with modifications.

### Usage
1. Include the script in index.html:
  ``` html
  <script src="./time-count-updater.js"></script>
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
