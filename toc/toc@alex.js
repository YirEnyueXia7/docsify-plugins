// docsify-plugin-toc@1.3.2/dist
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DocsifyPluginToc"] = factory();
	else
		root["DocsifyPluginToc"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/toc.js
// To collect headings and then add to the page ToC
// pageToC整体删改
function pageToC (headings, path) {
  let toc = ['<div class="page_toc">'];
  const list = [];
  headings = document.querySelectorAll(`#main ${window.$docsify.toc.target}`);
  // 获取配置的忽略关键词，如果没有配置则使用默认值
  const ignoreKeywords = window.$docsify.toc.ignoreHeaders || ['<!-- ignore-toc -->'];
  if (headings) {
    headings.forEach(function (heading) {
      const innerHtml = heading.innerHTML;
      // 检查是否包含任何配置的忽略关键词
      let needSkip = false;
      for (const keyword of ignoreKeywords) {
        if (innerHtml.includes(keyword)) {
          needSkip = true;
          break;
        }
      }
      if (needSkip) {
        return; // 跳过这个标题
      }
      // 从标题文本中移除所有配置的忽略注释
      let cleanHtml = innerHtml;
      for (const keyword of ignoreKeywords) {
        cleanHtml = cleanHtml.replace(keyword, '');
      }
      const item = generateToC(heading.tagName.replace(/h/gi, ''), cleanHtml);
      if (item) {
        list.push(item);
      }
    });
  }
  if (list.length > 0) {
    toc = toc.concat(list);
    toc.push('</div>');
    return toc.join('');
  } else {
    return '';
  }
}

// To generate each ToC item
function generateToC (level, html) {
  if (level >= 1 && level <= window.$docsify.toc.tocMaxLevel) {
    const heading = ['<div class="lv' + level + '">', html, '</div>'].join('')
    return heading
  }
  return ''
}

// scroll listener
const scrollHandler = () => {
  const clientHeight = window.innerHeight
  const titleBlocks = document.querySelectorAll(`#main ${window.$docsify.toc.target}`)
  let insightBlocks = []
  titleBlocks.forEach((titleBlock, index) => {
    const rect = titleBlock.getBoundingClientRect()
    // still in sight
    if (rect.top <= clientHeight && rect.height + rect.top > 0) {
      insightBlocks.push(index)
    }
  })
  const scrollingElement = document.scrollingElement || document.body
  // scroll to top, choose the first one
  if (scrollingElement.scrollTop === 0) {
    insightBlocks = [0]
  } else if (scrollingElement.offsetHeight - window.innerHeight - scrollingElement.scrollTop < 5 &&
    insightBlocks.length > 0) {
    // scroll to bottom and still multi title in sight, choose the first one
    insightBlocks = [insightBlocks[0]]
  }
  if (insightBlocks.length) {
    const tocList = document.querySelectorAll('.page_toc>div')
    tocList.forEach((t, index) => {
      if (index === insightBlocks[0]) {
        t.classList.add('active')
      } else {
        t.classList.remove('active')
      }
    })
  }
}

function install (hook, vm) {
  hook.mounted(function () {
    const content = window.Docsify.dom.find('.content')
    if (content) {
      const nav = window.Docsify.dom.create('aside', '')
      window.Docsify.dom.toggleClass(nav, 'add', 'toc-nav')
      window.Docsify.dom.before(content, nav)
    }
  })
  hook.doneEach(function () {
    const nav = window.Docsify.dom.find('.toc-nav')
    if (nav) {
      nav.innerHTML = pageToC().trim()
      if (nav.innerHTML === '') {
        window.Docsify.dom.toggleClass(nav, 'add', 'nothing')
        window.document.removeEventListener('scroll', scrollHandler)
      } else {
        window.Docsify.dom.toggleClass(nav, 'remove', 'nothing')
        scrollHandler()
        window.document.addEventListener('scroll', scrollHandler)
      }
    }
  })
}

;// CONCATENATED MODULE: ./src/index.js


if (!window.$docsify) {
  window.$docsify = {}
}

window.$docsify.plugins = (window.$docsify.plugins || []).concat(install)

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
