// Docsify plugin default values
let defaultDocsifyUpdatedOptions = {
  text: ">Last Modify: {docsify-updated}",
  formatUpdated: "{YYYY}/{MM}/{DD}",
  whereToPlace: "bottom"
}

// Docsify plugin functions
function plugin(hook, vm) {
  let wordsCount
  let text = vm.config.timeUpdater.text
  let whereToPlace = String(vm.config.timeUpdater.whereToPlace).toLowerCase()
  hook.beforeEach(function (content) {
    wordsCount = content.match(/([\u4e00-\u9fa5]+?|[a-zA-Z0-9]+)/g).length
    let finalText = text
      .replace('{words-count}', wordsCount)
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
