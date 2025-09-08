// docsify-updated@1.0.5/src
// Docsify plugin default values
let defaultDocsifyUpdatedOptions = {
  text: ">Last Modify: {docsify-updated}",
  formatUpdated: "{YYYY}/{MM}/{DD}",
  whereToPlace: "bottom"
}
// Docsify plugin functions
function plugin(hook, vm) {
  // 嫁接计数代码
  let wordsCount
  // 原time-updater代码
  let text = vm.config.timeUpdater.text
  let whereToPlace = String(vm.config.timeUpdater.whereToPlace).toLowerCase()
  // 新增插件失效机制
  hook.beforeEach(function (content) {
    // 2. 内容特征检测
    const contentIndicators = [ '404 Not Found', '404 Error', ];
    // 检查当前页面是否为README.md/404.md
    if (vm.route.path === '/' || vm.route.path.endsWith('README.md') || vm.route.path.endsWith('_404.md') || contentIndicators.some(indicator => content.includes(indicator))) {
      // 如果是README文件，直接返回原内容，不应用插件
      return content
    }
    // 嫁接计数代码
    // Match regex every time you start parsing .md
    wordsCount = content.match(/([\u4e00-\u9fa5]+?|[a-zA-Z0-9]+)/g).length
    // 替换文本中的占位符
    let finalText = text
      .replace('{words-count}', wordsCount)
    // 原time-updater代码
    switch (whereToPlace) {
      case "top":
        return finalText + "\n\n" + content
      case "bottom":
        return content + "\n\n" + finalText
      default:
        return content + "\n\n" + finalText
    }
  })
}
// Docsify plugin options
window.$docsify = (window.$docsify || {})
// https://docsify.js.org/#/configuration?id=formatupdated
// https://github.com/lukeed/tinydate#patterns
window.$docsify.formatUpdated = window.$docsify["timeUpdater"] ? window.$docsify["timeUpdater"].formatUpdated : defaultDocsifyUpdatedOptions.formatUpdated
window.$docsify["timeUpdater"] = Object.assign(defaultDocsifyUpdatedOptions, window.$docsify["timeUpdater"])
window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)
