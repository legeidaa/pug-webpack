/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 259:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en.json": 790,
	"./ru.json": 672
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 259;

/***/ }),

/***/ 790:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"lang":"en","firstpagename":"First","secondpagename":"Second","example":"english language"}');

/***/ }),

/***/ 672:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"lang":"ru","firstpagename":"Первая","secondpagename":"Вторая","example":"Русский язык"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/consts.js
const SUPPORTED_LANGS = ["ru","en"];
const CURRENT_LANG = document.documentElement.lang;
;// CONCATENATED MODULE: ./src/js/sdkInit.js

const langJSON = __webpack_require__(259)("./" + CURRENT_LANG + ".json");
// import langJSON from('../locales' + LANG + '.json') assert { type: 'json' };
let webMoneyHeader = new WebMoneyHeader();
let webMoneyFooter = new WebMoneyFooter();
const userData = {
  wmid: ''
};
function isActivePage(page) {
  if (window.location.pathname.indexOf(page) > -1) {
    return true;
  }
  return false;
}
function addPage(page) {
  let url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    title: langJSON[page] || `${page}`,
    url: url,
    active: isActivePage(page)
  };
}
webMoneyHeader.init({
  rootElement: document.getElementById("webMoneyHeader"),
  lang: CURRENT_LANG,
  serviceName: "ServiceName",
  rid: "DDACEB81-AD68-4C26-A3FD-AF030166963A",
  maxWidth: "1312px",
  firstLevel: [addPage("firstpagename", '/'), addPage("secondpagename", 'second.html')],
  onLoginBlockRendered: function (data) {
    if (data.wmid) {
      userData = data;
    } else {}
  }
});
webMoneyFooter.init({
  rootElement: document.getElementById("webMoneyFooter"),
  lang: CURRENT_LANG,
  supportedLangs: SUPPORTED_LANGS,
  maxWidth: "1312px",
  onChangeLang: function (lang) {
    location.href = location.href.replace(`/${CURRENT_LANG}/`, `/${lang}/`);
  }
});
;// CONCATENATED MODULE: ./src/js/main.js

})();

/******/ })()
;