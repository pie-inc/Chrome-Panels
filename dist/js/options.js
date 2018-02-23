/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  get: function get(fn) {
    chrome.storage.sync.get("options", fn);
  },
  set: function set(object) {
    chrome.storage.sync.set({
      "options": object
    }, function () {
      if (chrome.runtime.lastError) {
        console.log("Runtime error.");
      }
    });
  },
  update: function update(fn) {
    chrome.storage.sync.get("options", function (opts) {
      if (!chrome.runtime.lastError) {
        var settings = {
          width: opts.options.width,
          height: opts.options.height,
          isWide: opts.options.isWide
        };
        fn(settings);
      } else {
        console.error(chrome.runtime.lastError);
      }
    });
  }
};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sync = __webpack_require__(0);

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionsElems = {
  data: document.getElementById('data'),
  wide: document.getElementById('wide'),
  width: document.getElementById('width'),
  height: document.getElementById('height'),
  experimental: document.getElementById('experimental'),
  set: document.getElementById('set')
};

optionsElems.width.onchange = function () {
  if (optionsElems.wide.checked) {
    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);
  }
};
//width.value = 450;
optionsElems.wide.onchange = function () {
  if (optionsElems.wide.checked) {
    optionsElems.height.disabled = true;
  } else {
    optionsElems.height.disabled = false;
    optionsElems.height.value = Math.floor(optionsElems.width.value * 9 / 16);
  }
};

document.body.onload = function () {
  _sync2.default.update(function (options) {
    optionsElems.wide.checked = options.isWide;
    optionsElems.experimental.checked = options.experimental;
    optionsElems.width.value = options.width;
    optionsElems.height.value = options.height;
    optionsElems.height.value = options.height;
  });
};

optionsElems.set.onclick = function () {
  _sync2.default.set({
    width: parseInt(optionsElems.width.value),
    height: parseInt(optionsElems.height.value),
    isWide: optionsElems.wide.checked,
    experimental: optionsElems.experimental.checked
  });
  window.close();
};

/***/ })
/******/ ]);