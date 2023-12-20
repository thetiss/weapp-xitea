(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__EEAD9C3",
    appName: "weapp-heytea",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.98",
    uniRuntimeVersion: "3.98",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__EEAD9C3",
      appName: "weapp-heytea",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"weapp-heytea","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"weapp-heytea","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"weapp-heytea","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"weapp-heytea","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"weapp-heytea","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!******************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/pages.json ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!********************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mart = _interopRequireDefault(__webpack_require__(/*! ./mart.js */ 34));
var _martDetail = _interopRequireDefault(__webpack_require__(/*! ./martDetail.js */ 35));
var _news = _interopRequireDefault(__webpack_require__(/*! ./news.js */ 36));
var _notices = _interopRequireDefault(__webpack_require__(/*! ./notices.js */ 37));
var _categories = _interopRequireDefault(__webpack_require__(/*! ./categories.js */ 38));
// 注册1： 引入
// 注册1： 引入
// 注册1： 引入

var json = {
  mart: _mart.default,
  martDetail: _martDetail.default,
  news: _news.default,
  // 注册2： 命名[finish mock api]
  notices: _notices.default,
  categories: _categories.default
};
var _default = function _default(name) {
  var Loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (Loading) {
    uni.showLoading();
  }
  return new Promise(function (resolve) {
    setTimeout(function () {
      uni.hideLoading();
      resolve(json[name]);
    }, 500);
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 34 */
/*!*******************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/mart.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png",
  "id": 308158,
  "itemNo": "5875254410113816001",
  "itemStock": 629,
  "name": "芝芝果茶系列 喜茶xCONTIGO联名芝芝/波波吸管杯",
  "itemSalesVolume": 5734,
  "salePrice": 14800,
  "labelPrice": 14800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/1f2a67c624a7451d968e9e4b03954219.png",
  "id": 308157,
  "itemNo": "5875248837678562001",
  "itemStock": 52,
  "name": "芝芝果茶系列 芝芝/波波玻璃杯",
  "itemSalesVolume": 2784,
  "salePrice": 3800,
  "labelPrice": 3800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/144c0c63c6974c31aed91115880e0f2f.png",
  "id": 308145,
  "itemNo": "5873948140577130001",
  "itemStock": 36,
  "name": "夫子来喜 茶礼盒",
  "itemSalesVolume": 102,
  "salePrice": 6800,
  "labelPrice": 6800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/33877cdc294b4f53b6d354a811b70e98.png",
  "id": 308160,
  "itemNo": "5889961614260412001",
  "itemStock": 1098,
  "name": "太妃焦糖味 爆米花 60gX3袋",
  "itemSalesVolume": 1517,
  "salePrice": 3600,
  "labelPrice": 3600
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/4bf0414775c44eca829aa5242d459a05.png",
  "id": 308159,
  "itemNo": "5878654210726418001",
  "itemStock": 637,
  "name": "灵感一周茶礼盒 7款喜茶经典茗茶袋泡茶",
  "itemSalesVolume": 1848,
  "salePrice": 4800,
  "labelPrice": 4800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/d3630bd4bc854938a8169c420f3a6849.jpg",
  "id": 308156,
  "itemNo": "5875245257658433001",
  "itemStock": 763,
  "name": "混坚果3口味 2盒装 芥末味/海苔味/麻辣火锅味",
  "itemSalesVolume": 2082,
  "salePrice": 6000,
  "labelPrice": 6000
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/edc8203bfaab4cb19caf01e168acecf1.png",
  "id": 308152,
  "itemNo": "5874582768671687001",
  "itemStock": 77,
  "name": "广州限定搪瓷杯",
  "itemSalesVolume": 370,
  "salePrice": 8400,
  "labelPrice": 8400
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/73ef887855c74af09702b635d1464973.png",
  "id": 308153,
  "itemNo": "5874584305257205001",
  "itemStock": 35,
  "name": "广州限定帆布袋",
  "itemSalesVolume": 311,
  "salePrice": 5800,
  "labelPrice": 5800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/d58efe491b54453bb86757ad71e1a725.png",
  "id": 308154,
  "itemNo": "5874586879833837001",
  "itemStock": 187,
  "name": "广州限定皮质手机壳",
  "itemSalesVolume": 142,
  "salePrice": 7200,
  "labelPrice": 7200
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/b99765b790b842fba62f087e156f6c6b.png",
  "id": 308155,
  "itemNo": "5874589128570809001",
  "itemStock": 71,
  "name": "广州限定钥匙扣",
  "itemSalesVolume": 141,
  "salePrice": 3800,
  "labelPrice": 3800
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/81cf385b26fe48d7971b81bedf4a28e3.png",
  "id": 308135,
  "itemNo": "5871100589448027001",
  "itemStock": 567,
  "name": "喜茶WonderLab联名礼盒 饱腹食品代餐奶昔6瓶",
  "itemSalesVolume": 1245,
  "salePrice": 13900,
  "labelPrice": 15900
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/7e8f188bef8f48eea2a208970be59153.png",
  "id": 308142,
  "itemNo": "5871327666758468001",
  "itemStock": 6814,
  "name": "喜茶饼家夹心小方",
  "itemSalesVolume": 1797,
  "salePrice": 4500,
  "labelPrice": 4500
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/28a63bbd2bf6467790d39f4ed9274ec1.png",
  "id": 308129,
  "itemNo": "5858321915470775001",
  "itemStock": 212,
  "name": "灵感魔都手机壳",
  "itemSalesVolume": 227,
  "salePrice": 2900,
  "labelPrice": 2900
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/ce87ab4bf1bd4dd8b2249fc4bc228baf.png",
  "id": 308130,
  "itemNo": "5858325640508027001",
  "itemStock": 66,
  "name": "灵感魔都帆布袋",
  "itemSalesVolume": 200,
  "salePrice": 3900,
  "labelPrice": 3900
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/0f178944c5db4cf3a76489010c0f24d0.png",
  "id": 308132,
  "itemNo": "5858332808611918001",
  "itemStock": 0,
  "name": "灵感魔都小男巫钥匙扣",
  "itemSalesVolume": 168,
  "salePrice": 2900,
  "labelPrice": 2900
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/17198929f7e7409aadf8930e492770bb.png",
  "id": 308131,
  "itemNo": "5858330358639234001",
  "itemStock": 0,
  "name": "灵感魔都冰箱贴",
  "itemSalesVolume": 334,
  "salePrice": 2500,
  "labelPrice": 2500
}, {
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/db26492cad3b40afbfe819c39df5ee58.png",
  "id": 308133,
  "itemNo": "5858334811291675001",
  "itemStock": 0,
  "name": "灵感魔都AirPods Case",
  "itemSalesVolume": 273,
  "salePrice": 2900,
  "labelPrice": 2900
}];
exports.default = _default;

/***/ }),
/* 35 */
/*!*************************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/martDetail.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _storeId$storeIdList$;
var _default = (_storeId$storeIdList$ = {
  "storeId": 9203,
  "storeIdList": null,
  "id": 308158,
  "itemNo": "5875254410113816001"
}, (0, _defineProperty2.default)(_storeId$storeIdList$, "storeId", 9203), (0, _defineProperty2.default)(_storeId$storeIdList$, "barcode", "WD015875254410118605"), (0, _defineProperty2.default)(_storeId$storeIdList$, "name", "芝芝果茶系列 喜茶xCONTIGO联名芝芝/波波吸管杯"), (0, _defineProperty2.default)(_storeId$storeIdList$, "categoryId", 5008066737), (0, _defineProperty2.default)(_storeId$storeIdList$, "labelId", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "labelName", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "brand", ""), (0, _defineProperty2.default)(_storeId$storeIdList$, "categoryDTO", {
  "id": 5008066737,
  "parentId": null,
  "category": "杯类产品",
  "categoryImgUrl": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/fe5bafefa36c4c07b1b4e8c8bf4cb9f8z",
  "status": 1,
  "seq": 28,
  "isLeaf": 1,
  "industryId": 3,
  "name": null,
  "imgUrl": null,
  "imgUrlValue": null,
  "childrenCategory": [],
  "parentCategory": null,
  "outCategoryIdList": null
}), (0, _defineProperty2.default)(_storeId$storeIdList$, "salePrice", 14800), (0, _defineProperty2.default)(_storeId$storeIdList$, "labelPrice", 14800), (0, _defineProperty2.default)(_storeId$storeIdList$, "memberPrice", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "itemSalesVolume", 5735), (0, _defineProperty2.default)(_storeId$storeIdList$, "virtualSalesVolume", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "isShelf", 1), (0, _defineProperty2.default)(_storeId$storeIdList$, "itemStock", 626), (0, _defineProperty2.default)(_storeId$storeIdList$, "itemWithholdStock", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "brand", '喜茶'), (0, _defineProperty2.default)(_storeId$storeIdList$, "describe", "<p><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/636beabc152f42b4a53b03e965a6256a.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/a0859178aef54178a7931cca26364577.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/70d45373965244d7aa69694cf80dcec2.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/37556ad39fbd43aaa245088017c15d44.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/bf8f0864d0854829aa82c2fd7178e2ef.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/8b40a73f6a9042a385ab4c65e053802f.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/50f7f75426b9412b95d8848fc4090069.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/80a346fac54749a1acad9c8ec115b11f.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/e2109b23aa354853a0faed67ad14e3ed.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/21dccf357bc74cc0a0faecf39c13a421.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/debb7001eaea4fe1aaa5012820d55abf.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/c3b7d74a6a0545d6857e9ed1bc26de9a.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/b5dfcec384c94d609572e88bf7fc0f54.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f1ca48c88dc9438abfefa9ca57c43dca.png\" style=\"max-width: 100%;\"></p>"), (0, _defineProperty2.default)(_storeId$storeIdList$, "status", 1), (0, _defineProperty2.default)(_storeId$storeIdList$, "thumbnail", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png"), (0, _defineProperty2.default)(_storeId$storeIdList$, "tag1", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "unit", "个"), (0, _defineProperty2.default)(_storeId$storeIdList$, "paySubtractStock", false), (0, _defineProperty2.default)(_storeId$storeIdList$, "itemOrder", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "createTime", "2020-04-22 11:17:26"), (0, _defineProperty2.default)(_storeId$storeIdList$, "updateTime", "2020-05-25 00:47:00"), (0, _defineProperty2.default)(_storeId$storeIdList$, "costPrice", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "freight", 1200), (0, _defineProperty2.default)(_storeId$storeIdList$, "weight", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "placeOfOrigin", ""), (0, _defineProperty2.default)(_storeId$storeIdList$, "shelfLife", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "shelfLifeUnit", 0), (0, _defineProperty2.default)(_storeId$storeIdList$, "deliveryTimeType", 1), (0, _defineProperty2.default)(_storeId$storeIdList$, "deliveryTime", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "daysAfterBuy", 1), (0, _defineProperty2.default)(_storeId$storeIdList$, "daysAfterBuyRange", "1-3"), (0, _defineProperty2.default)(_storeId$storeIdList$, "preSellStartTime", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "preSellEndTime", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "freightTemplateId", 21), (0, _defineProperty2.default)(_storeId$storeIdList$, "invoiceTemplateId", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "length", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "width", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "height", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "volume", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "subName", "仅波波吸管杯&芝芝吸管杯有货"), (0, _defineProperty2.default)(_storeId$storeIdList$, "peopleLimitAmount", null), (0, _defineProperty2.default)(_storeId$storeIdList$, "placeOfDispatch", "广东广州"), (0, _defineProperty2.default)(_storeId$storeIdList$, "shelfTime", "2020-05-23T02:04:50.000+0000"), (0, _defineProperty2.default)(_storeId$storeIdList$, "preSell", false), (0, _defineProperty2.default)(_storeId$storeIdList$, "materialUrls", ["https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/524757c5ea534781b18fb882cdb4f650.png", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f5bc97d7e70e4c5e9d516dde70dc9701.png", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/6300ca05a21e4283869b090a0e5ffec7.png", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/2307edb41ce8451bb5fbb20c4dad05a1.png"]), (0, _defineProperty2.default)(_storeId$storeIdList$, "skuTreeList", [{
  "keyId": 116,
  "attrKeySort": 0,
  "keyName": "款式",
  "showImage": 0,
  "treeValList": [{
    "valId": 1700,
    "attrValSort": 0,
    "valName": "莓莓吸管杯",
    "imageId": null,
    "imageUrl": null
  }, {
    "valId": 1701,
    "attrValSort": 1,
    "valName": "桃桃吸管杯",
    "imageId": null,
    "imageUrl": null
  }, {
    "valId": 1707,
    "attrValSort": 2,
    "valName": "芝芝吸管杯",
    "imageId": null,
    "imageUrl": null
  }, {
    "valId": 1708,
    "attrValSort": 3,
    "valName": "波波吸管杯",
    "imageId": null,
    "imageUrl": null
  }, {
    "valId": 1709,
    "attrValSort": 4,
    "valName": "葡萄吸管杯",
    "imageId": null,
    "imageUrl": null
  }]
}]), (0, _defineProperty2.default)(_storeId$storeIdList$, "skuInfoList", [{
  "skuId": 12410,
  "skuBarcode": "50100830",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1700,
    "attrValSort": null,
    "valName": "莓莓吸管杯"
  }],
  "itemNo": "5875254410113816001"
}, {
  "skuId": 12411,
  "skuBarcode": "50100832",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1701,
    "attrValSort": null,
    "valName": "桃桃吸管杯"
  }],
  "itemNo": "5875254410113816001"
}, {
  "skuId": 12416,
  "skuBarcode": "50100833",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 222,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1707,
    "attrValSort": null,
    "valName": "芝芝吸管杯"
  }],
  "itemNo": "5875254410113816001"
}, {
  "skuId": 12417,
  "skuBarcode": "50100831",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 404,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1708,
    "attrValSort": null,
    "valName": "波波吸管杯"
  }],
  "itemNo": "5875254410113816001"
}, {
  "skuId": 12418,
  "skuBarcode": "50100829",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1709,
    "attrValSort": null,
    "valName": "葡萄吸管杯"
  }],
  "itemNo": "5875254410113816001"
}]), _storeId$storeIdList$);
exports.default = _default;

/***/ }),
/* 36 */
/*!*******************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/news.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "id": 53,
  "postId": 48,
  "no": "BB20200525152258",
  "sort": 1,
  "type": 1,
  "contentType": 1,
  "title": "喜茶制粽，现正预售中",
  "subtitle": "2020喜茶制粽端午礼盒",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/25/d7f9a7e9ea3747778d301b443147cd82.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/eWEMnvHNtOEup-hzE38r8Q",
    "appId": null
  }
}, {
  "id": 54,
  "postId": 49,
  "no": "BB20200525152844",
  "sort": 2,
  "type": 1,
  "contentType": 1,
  "title": "来颗布蕾QQ麻薯球",
  "subtitle": "灵感之茶，与音乐共生",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/25/0346c403e88243eaa76aa334097ad8ec.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/AaMBCLliMla5ktAVF5TGSA",
    "appId": null
  }
}, {
  "id": 50,
  "postId": 45,
  "no": "BB20200508143203",
  "sort": 3,
  "type": 1,
  "contentType": 1,
  "title": "喜茶星球会员升级啦",
  "subtitle": "点击了解升级详情",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/08/0a11147144ff42629e6eca9eeec53215.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 0,
    "name": null,
    "path": "pages/member/upgrade_publicity/index",
    "appId": null
  }
}, {
  "id": 51,
  "postId": 46,
  "no": "BB20200521172417",
  "sort": 4,
  "type": 1,
  "contentType": 1,
  "title": "多肉车厘回归",
  "subtitle": "喜茶大陆门店现已有售",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/21/14b70fe3fd1d4a8eb0d079d5ac571bfb.jpeg",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/nhnQd7zQlqJXMsjChVfCsw",
    "appId": null
  }
}, {
  "id": 52,
  "postId": 47,
  "no": "BB20200521172540",
  "sort": 5,
  "type": 1,
  "contentType": 1,
  "title": "一杯灵感之茶的诞生",
  "subtitle": "新茶风，喜茶造",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/21/f4ae061b3b1d44cfa8518b8b6ec8f348.jpeg",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/wXSC4MrE7NJlTk6uluhmDA",
    "appId": null
  }
}];
exports.default = _default;

/***/ }),
/* 37 */
/*!**********************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/notices.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "id": 10,
  "content": "多肉车厘回归，精选当季山东樱桃，颗颗手工去核，入茶清甜消暑，快来下单尝鲜吧~",
  "image_id": 114210,
  "image": "https://go.cdn.heytea.com/2020/02/26/tmp/f5d557b627b640838d0c324bd96eabfb.jpg"
}, {
  "id": 7,
  "content": "太妃焦糖爆米花全新上市，焦香十足，美味易爆，快来「喜茶食验室」下单尝鲜吧~",
  "image_id": 104726,
  "image": "https://go.cdn.heytea.com/2020/01/09/tmp/3f393edea5094c1d8f8b524610caa531.jpg"
}];
exports.default = _default;

/***/ }),
/* 38 */
/*!*************************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/api/categories.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "id": 20,
  "name": "喜茶食验室",
  "sort": 1,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/f77f2e333a34410384c21da48e138599.jpg",
  "products": [{
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg"
    }, {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "0糖低卡甜菊糖",
      "values": [{
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "加料",
      "values": [{
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "绿色喜茶",
      "values": [{
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true
      }, {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false
      }, {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "冰量",
      "values": [{
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false
      }, {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "甜度",
      "values": [{
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "茶底",
      "values": [{
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "口味",
      "values": [{
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false
      }, {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }, {
    "id": 1061,
    "name": "未来肉芝士堡",
    "no": "2005095380168625",
    "description": "选用星期零植物基未来肉打造，每100克未来肉含17.1克蛋白质与5.5克膳食纤维，热量仅为真牛肉的51%，叠加干酪片与青节瓜，突破食界，品尝未来。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 153382,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/24/5ba38e1966334ff9af2ee27e1a803497.jpg"
    }, {
      "id": 147238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/88d10a251f5841a185101aaccfa7952e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 16,
      "name": "含小麦、大豆",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 22,
      "name": "含乳制品、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 22.12
  }, {
    "id": 1036,
    "name": "混坚果",
    "no": "2004238677566283",
    "description": "喜茶首款混合坚果，1盒内含3种口味：日式芥末、酥脆海苔、麻辣火锅。精选越南大颗腰果、美国加州巴旦木仁与土耳其榛子仁，独特喷淋技术，保证颗颗够味。自然慢焙烘烤，零人工添加色素与防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 141992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/01/7bf2447422bf4acb95b1a82366eeba34.jpg"
    }, {
      "id": 139423,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c2bf42835baf453d8987afa54e796f0e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2349,
      "name": "混坚果",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 80,
      "name": "含坚果、大豆及乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 81,
      "name": "含小麦制品、虾制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30
  }, {
    "id": 1033,
    "name": "夹心小方(咸蛋黄味)",
    "no": "2004204939030796",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。咸蛋黄饼皮搭配浓郁原味夹心，一口吃下奶香和咸蛋黄相互交织，甜而不腻。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 145005,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/b796c7a8edd44e7e968745cb63eae3a2.jpg"
    }, {
      "id": 137571,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/882651cb064e4326b4b73c57cadbf8b8.jpg"
    }, {
      "id": 137572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/401a0054f6d040709b316d2c23c7b3c2.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2336,
      "name": "夹心小方(咸蛋黄味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45
  }, {
    "id": 1031,
    "name": "夹心小方(芝士味)",
    "no": "2004208719981465",
    "description": "10片/盒，每片均为独立小包装。全新口味登场，喜茶经典芝士化身浓郁芝香夹心，每一口都是浓浓芝士味。精选丹麦深加工芝士与美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 145004,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/9d1f23859ef0495aade6cbe0d46c492b.jpg"
    }, {
      "id": 137566,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/43b09ca3b38a4c08a0b6ad142d1ad2ed.jpg"
    }, {
      "id": 137567,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/8c4264b660714a70bda5f13e92c04377.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2334,
      "name": "夹心小方(芝士味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45
  }, {
    "id": 1032,
    "name": "夹心小方(金凤味)",
    "no": "2004202778423181",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。金凤茶叶原叶研磨成焙香茶粉，融入饼皮和夹心，炭焙乌龙口感清新。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 145006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/cf932ed0413a42b9a4a59aac686db19b.jpg"
    }, {
      "id": 137569,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/9c35d5aa21d44791bbd2b7bad308f256.jpg"
    }, {
      "id": 137570,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/6a6b02329cd64ddfa1c2ab87dfb0d209.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2335,
      "name": "夹心小方(金凤味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45
  }, {
    "id": 985,
    "name": "黑糖波波希腊酸奶",
    "no": "2003226159266660",
    "description": "黑糖脆波波与希腊酸奶灵感碰撞，酸奶部分无糖。选用100%生牛乳发酵，零添加色素、明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 126120,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ecd4f6fcfdb8406ab297607c517b9790.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "绿色喜茶",
      "values": [{
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1
      }, {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0
      }]
    }],
    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81
  }, {
    "id": 986,
    "name": "蓝莓希腊酸奶",
    "no": "2003234480984193",
    "description": "加拿大野生蓝莓融入希腊酸奶，酸奶部分无糖。选用100%生牛乳发酵，零添加色素和明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [{
      "id": 126119,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ab0773906b3646278a84fe3dfaa759e9.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "绿色喜茶",
      "values": [{
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1
      }, {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0
      }]
    }],
    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81
  }, {
    "id": 967,
    "name": "芋泥咸蛋黄米面包",
    "no": "2003087530550002",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入咸蛋黄和芋泥，美味与饱腹兼备。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 9,
    "images": [{
      "id": 119991,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/df694d96fb574658b11cde291aee699b.jpg"
    }, {
      "id": 121237,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/50d442e74263480580861b2ba99db4b6.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50
  }, {
    "id": 966,
    "name": "紫米紫薯米面包",
    "no": "2003089320320200",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入紫米紫薯两种杂粮，营养更均衡。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 10,
    "images": [{
      "id": 119992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/08e8693f93db4152a16365469509c346.jpg"
    }, {
      "id": 121238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/d0674101531d4140b530fbb23bb0e458.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50
  }, {
    "id": 188,
    "name": "芋泥糯米糍",
    "no": "1905258507239912",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，绵柔的芋泥内馅中带着细密颗粒感。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 14,
    "images": [{
      "id": 2958,
      "url": "https://go.cdn.heytea.com/storage/products/2018/12/07/D26Q9kO7a2ctt3ApN39vVuZNMa7OhjX6afuAScUg.jpg"
    }, {
      "id": 121296,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/672cdb1e78b64cba9c7bd26192f7069c.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 818,
      "name": "芋泥糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [{
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96
  }, {
    "id": 522,
    "name": "布蕾糯米糍",
    "no": "1908077847471771",
    "description": "下单后不用等待叫号，直接出示给店员领取。Q弹冰爽的糯米糍裹入口即化的法式布蕾，满口留香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 15,
    "images": [{
      "id": 65894,
      "url": "https://go.cdn.heytea.com/product/2019/08/08/tmp/abfbe602452f4b9c8143c732b4b99f78.jpg"
    }, {
      "id": 121292,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/3105afea13424d76b54cfdd01332aec3.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1391,
      "name": "布蕾糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [{
      "id": 90,
      "name": "含蛋、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96
  }, {
    "id": 444,
    "name": "芒果糯米糍",
    "no": "1906114107951144",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯香外皮裹入大块芒果果肉，真材实料，芒香四溢。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 16,
    "images": [{
      "id": 51963,
      "url": "https://go.cdn.heytea.com/product/2019/06/11/tmp/534fc9ec25414764b3aa479b44549a1c.jpg"
    }, {
      "id": 121295,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/182cb5f3f04d41b3ac32146dbf38e1a9.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1246,
      "name": "芒果糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [{
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62
  }, {
    "id": 187,
    "name": "榴莲糯米糍",
    "no": "1905254929085716",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，榴莲蓉内馅顺滑，浓郁中带有淡淡奶香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 17,
    "images": [{
      "id": 88395,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/339aab7f76e24296b1e716fab785c5bb.jpg"
    }, {
      "id": 121293,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7579079c0b0a4d7d8b464c3321e8f767.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 817,
      "name": "榴莲糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [{
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93
  }, {
    "id": 736,
    "name": "日式海盐牛角",
    "no": "1911120202609824",
    "description": "加入黄油烘焙的牛角包更加香酥，表面撒上些许海盐提香提味。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 18,
    "images": [{
      "id": 88571,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/f26206a42b2b48c38bef58c795d30e3a.jpg"
    }, {
      "id": 121234,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f09ec6f23c3543619731b1c37c9e790c.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96
  }, {
    "id": 161,
    "name": "流沙牛角",
    "no": "1812135249995598",
    "description": "下单后不用等待叫号，直接出示给店员领取。在酥脆的牛角中注入咸蛋黄流沙，黄油甜香中带有粗颗粒的微咸，层次丰富，满口留香。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 19,
    "images": [{
      "id": 88364,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg"
    }, {
      "id": 121233,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/78ad5460e80d4587a8f07abc4baf76e9.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85
  }, {
    "id": 735,
    "name": "芋泥牛角",
    "no": "1911125473384653",
    "description": "软绵绵的芋泥填入松脆牛角包，带来双重满足口感。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 20,
    "images": [{
      "id": 88568,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/e479684b39db4cfea36e31c6e434ccd7.jpg"
    }, {
      "id": 121241,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/979ca41d0238481ea7c3a7cb73335bd1.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62
  }, {
    "id": 534,
    "name": "法式布蕾牛角",
    "no": "1908125985893028",
    "description": "烤至酥脆的牛角中注入酸甜芝士布蕾，满口留香。（芝士奶酸味属正常口感）",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 21,
    "images": [{
      "id": 66925,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/b297da7e150e46cc98c2138a290c9fb4.jpg"
    }, {
      "id": 121231,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/1e1a115b801d439281790230bcfaeb0c.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 91,
      "name": "含麦、蛋、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85
  }, {
    "id": 535,
    "name": "海苔肉酥牛角",
    "no": "1908128591156037",
    "description": "酥脆的海苔肉酥铺满整只牛角包，芝士奶油醇香柔滑。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 22,
    "images": [{
      "id": 66934,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/d5ebe688cd0b4f8d922505aac18a6fcb.jpg"
    }, {
      "id": 121232,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/a16f9bf3635e4875be1507a598d10ecc.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62
  }, {
    "id": 316,
    "name": "咸蛋黄千层吐司",
    "no": "1903059853995257",
    "description": "下单后不用等待叫号，直接出示给店员领取。咸香蛋黄与奶香吐司层层交织，带来极度细腻的口感体验。",
    "label": "吐司",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 23,
    "images": [{
      "id": 23974,
      "url": "https://go.cdn.heytea.com/storage/products/2019/03/07/VJeeKv4CvYLoPhgFedawCrao1BfjTF2nNZ46ucKA.jpg"
    }, {
      "id": 121290,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f6acd196783c4d4c8cc6e41eaed3062a.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1039,
      "name": "咸蛋黄千层吐司",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [{
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "24",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 21.24
  }, {
    "id": 159,
    "name": "小芋头条",
    "no": "1812139850535155",
    "description": "下单后不用等待叫号，直接出示给店员领取。来自喜茶热麦颇受欢迎的芋头条，现调整为适合一人食的分量，依然内馅饱满，与软韧的面包体默契相融。",
    "label": "小芋头条",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 24,
    "images": [{
      "id": 88366,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/2bed4fc9c2fe4d61a1ffd7d7835594b7.jpg"
    }, {
      "id": 121240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/25ea4c4d3db44e0bae3b080a18f24a69.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "状态",
      "values": [{
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 13.27
  }, {
    "id": 1064,
    "name": "太妃焦糖爆米花",
    "no": "2005127848825331",
    "description": "精选爆裂玉米与新西兰进口黄油炒制，每一条缝隙都填满太妃焦糖甜香，不含反式脂肪酸，0防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 150037,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/6def2c810a5c4d1a80912ffad47f3162.jpg"
    }, {
      "id": 150038,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/99f43d68f57c4278b62e5354510223c3.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2406,
      "name": "太妃焦糖爆米花",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 102,
      "name": "含大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 0,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 11.32
  }, {
    "id": 836,
    "name": "火腿蛋可颂脆堡",
    "no": "1912251537314614",
    "description": "可颂面包夹入大块烟熏火腿与原味蛋饼，车打芝士更添浓郁奶香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [{
      "id": 110948,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/41041a1dba3243c1859bfba0615d3797.jpg"
    }, {
      "id": 121298,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/48db64dea6fa4c4b99ae3a005be469c9.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 94,
      "name": "含小麦、燕麦、蛋",
      "type": 0,
      "label_color": "#BABABA"
    }, {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81
  }, {
    "id": 838,
    "name": "熏鸡芝士蛋三明治",
    "no": "1912253512109898",
    "description": "烟熏鸡肉混搭鸡蛋色拉与车打芝士，每一口都十足有料。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [{
      "id": 110950,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b8969a8830a485c945b2e5e353f20dc.jpg"
    }, {
      "id": 121299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/127cadc6fe59432390db87caf2fa2b68.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 96,
      "name": "含小麦、蛋、乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81
  }, {
    "id": 837,
    "name": "芝芝火腿可颂",
    "no": "1912257503138775",
    "description": "烘烤至酥脆的酥香可颂，内夹烟熏火腿和车打芝士，满口留香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [{
      "id": 110949,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b90d1cb46ed434d836352e1bdd9245e.jpg"
    }, {
      "id": 121300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7f8cca1df210430fa3375f650209a91d.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 97,
      "name": "含小麦、乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93
  }, {
    "id": 617,
    "name": "冷萃桂花绿",
    "no": "1909306163749525",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "冷萃",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 25,
    "images": [{
      "id": 79221,
      "url": "https://go.cdn.heytea.com/product/2019/10/01/tmp/9d41fd6573ab49ab8eeb71b2746c0ba4.jpg"
    }, {
      "id": 116975,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7dcb32e0d8f047678447e7c30064c030.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1515,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "国内-喜茶实验室",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49
  }],
  "categoryAds": []
}, {
  "id": 12,
  "name": "当季限定",
  "sort": 2,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/05/02/c9d862a735af48d280ab8b21a2315514.jpg",
  "products": [{
    "id": 421,
    "name": "芝芝桃桃",
    "no": "1906061363116531",
    "description": "冷670ml 热500ml 精选当季水蜜桃+NFC桃汁（100%非浓缩还原桃汁）搭配金玉茶底制作而成，不使用任何香精等添加剂，不使用任何罐头水果。粉色为火龙果天然调色。若有小黑点，是火龙果籽，可放心食用。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 147227,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/f00875e937244d3188f462e43c21170a.jpg"
    }, {
      "id": 139431,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c846a8fc574146ccad2f9a7581a692ef.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "0糖低卡甜菊糖",
      "values": [{
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "加料",
      "values": [{
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "绿色喜茶",
      "values": [{
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true
      }, {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false
      }, {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "冰量",
      "values": [{
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false
      }, {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "甜度",
      "values": [{
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "茶底",
      "values": [{
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "口味",
      "values": [{
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false
      }, {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "0",
    "remark": "大陆普通",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30
  }, {
    "id": 1037,
    "name": "多肉杨梅",
    "no": "2004238175994068",
    "description": "冷670ml 精选当季云南鲜杨梅，颗颗手剥去核。搭配来自优质茶园的绿妍原茶及喜茶经典芝士，冰凉消暑。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 147226,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/b95776a518d144ce8039a149c8ecf415.jpg"
    }, {
      "id": 139334,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/d9cdb5e74f93439ebe30fdaa4928b5bd.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "0糖低卡甜菊糖",
      "values": [{
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "加料",
      "values": [{
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "绿色喜茶",
      "values": [{
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true
      }, {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false
      }, {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "冰量",
      "values": [{
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false
      }, {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "甜度",
      "values": [{
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "茶底",
      "values": [{
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "口味",
      "values": [{
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false
      }, {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "0",
    "remark": "普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 1014,
    "name": "芝芝莓莓桃",
    "no": "2004104298716366",
    "description": "冷670ml 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 12,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 140872,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/28/bfbe92590fa244b09353b873a5ca98a3.jpg"
    }, {
      "id": 134740,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/14/1feb8648edad4cc9a37d9b1bdead9b59.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25
  }],
  "categoryAds": []
}, {
  "id": 67,
  "name": "人气必喝榜",
  "sort": 3,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/3b52e3d18fae4290b0a668a776b21645.jpg",
  "products": [{
    "id": 944,
    "name": "满杯红柚",
    "no": "2002289831003882",
    "description": "冷670ml  热500ml 人气Top7 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 72,
    "images": [{
      "id": 135796,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/16/334021739fee4274989793ce343156fd.jpg"
    }, {
      "id": 117022,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/07dae739032e4b5f9034c82cfad32aa4.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b6041bf0a93046039123851d0250101f.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58
  }, {
    "id": 931,
    "name": "多肉葡萄",
    "no": "2002282994907759",
    "description": "冷670ml 热500ml 人气Top1 精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 143240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/26c8a4213c9243e88f4e3f6cfa14c30b.jpg"
    }, {
      "id": 117056,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/1d874e762358478aa3ae4385a1397819.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b280fca74f744e6896cabdb73ae31f47.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30
  }, {
    "id": 941,
    "name": "多肉芒芒甘露",
    "no": "2002288368800095",
    "description": "冷/热500ml  人气Top2 经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 150526,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/40a6757ad5d34161aedda557f63bf315.jpg"
    }, {
      "id": 117044,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/dab56268b0fa44499f3255e95657cf18.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/4015de8912a14300a877b19569096cda.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg"
    }, {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "materials": [{
      "group_name": "0糖低卡甜菊糖",
      "values": [{
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "加料",
      "values": [{
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true
      }]
    }, {
      "group_name": "绿色喜茶",
      "values": [{
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true
      }, {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false
      }, {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "冰量",
      "values": [{
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false
      }, {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "甜度",
      "values": [{
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false
      }, {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "茶底",
      "values": [{
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false
      }]
    }, {
      "group_name": "口味",
      "values": [{
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true
      }, {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false
      }, {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false
      }]
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }, {
    "id": 1070,
    "name": "芝芝莓莓桃",
    "no": "2005182670291325",
    "description": "冷670ml 人气Top4 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 150244,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/9faf0150339d4b9f97f15b95aa6e1eea.jpg"
    }, {
      "id": 150263,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/befb6794a056416cb6d2887e8950b99e.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/05/18/a7df1a4418d14475aab48a76268cc8d1.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25
  }, {
    "id": 938,
    "name": "芝芝芒芒 ®",
    "no": "2002280824114931",
    "description": "冷670ml 人气Top5 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 150528,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/0c30e67747c04eeeb05a90b06a79c999.jpg"
    }, {
      "id": 117074,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/fa956693617d4eecb733b4a7dc9dd333.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/41c6464515484d4797055629ea3ac978.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }, {
    "id": 935,
    "name": "烤黑糖波波鲜奶",
    "no": "2002288501288017",
    "description": "冷480ml 热500ml  人气Top6  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [{
      "id": 143245,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/489faf24180c45fe974f7711b5c945b0.jpg"
    }, {
      "id": 116588,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/b9a1a1446e114335b9319a3a82e5e99f.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/880caa818dd1464d99f1a3b15fc74408.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81
  }, {
    "id": 933,
    "name": "豆豆波波茶",
    "no": "2002284899436338",
    "description": "冷/热500ml 人气Top8 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 76,
    "images": [{
      "id": 150529,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/2cbf29cd972346e6afce4ae44bdbd001.jpg"
    }, {
      "id": 116602,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/c1c1e721aae848ba9ec0c90642595a07.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/51dd0977ee194011b5a0c8caea5f2634.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 934,
    "name": "芋泥波波鲜奶",
    "no": "2002283784744731",
    "description": "冷/热500ml  人气Top9  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 82,
    "images": [{
      "id": 150530,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/8f982f2fedb049bbb42afb1ec660b157.jpg"
    }, {
      "id": 116600,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/666de01e56fa40a5b57fa6b9f3fd7651.jpg"
    }],
    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/0c485a9ec288466186b30e1fb65449b9.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 923,
    "name": "m豆波波",
    "no": "2002263405725906",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 172,
    "images": [{
      "id": 114333,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/2c409b83237148f58ae346c44254a382.jpg"
    }, {
      "id": 116572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/f1656b78be914bc7aacfabc2dd87ad6d.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 922,
    "name": "空气巧克力波波",
    "no": "2002260260233795",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 202,
    "images": [{
      "id": 114321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/cd87394ec858482499b89db226e17626.jpg"
    }, {
      "id": 116591,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/135b9a02c96b4be8af8ae7fe827613c3.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42
  }],
  "categoryAds": []
}, {
  "id": 17,
  "name": "喜茶制冰",
  "sort": 4,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/ef7b2a24507a4e20b50355eccc3261db.jpg",
  "products": [{
    "id": 865,
    "name": "锡兰奶茶脆筒",
    "no": "2001106350637687",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，感谢理解。丝滑奶香与锡兰红茶交织，浓郁茶香，入口难忘。",
    "label": "",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 1,
    "images": [{
      "id": 104839,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/10/a80b8ad8282c4c14b619a17e2524abc8.jpg"
    }, {
      "id": 117368,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a03b4da4d8984bb6a0d2374c73c3dc11.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 84,
      "name": "含乳、麦制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49
  }, {
    "id": 482,
    "name": "芝芝脆筒",
    "no": "1907049396650773",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。首次将喜茶经典芝士与冰淇淋结合，芝香浓郁，乳香丝滑。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 2,
    "images": [{
      "id": 61018,
      "url": "https://go.cdn.heytea.com/product/2019/07/17/tmp/e9d83a24f39547f98369ce8bfdd781af.jpg"
    }, {
      "id": 117369,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a30e76e5abfb420db8deda04715c7aec.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 89,
      "name": "含乳、麦制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49
  }, {
    "id": 716,
    "name": "豆豆雪糕杯",
    "no": "1911057652116163",
    "description": "雪山黄豆粉和吹弹可破的豆花置于芝芝冰淇淋上，缀以软糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 86879,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/05/1d09b9bff6934df5a55c009c4c7d176c.jpg"
    }, {
      "id": 117140,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e6f339018d96413897f20e143153718b.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 60,
      "name": "含乳制品、大豆",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 14.15
  }, {
    "id": 91,
    "name": "波波雪糕杯",
    "no": "1812235098495352",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。浓醇乳香融入定制茶香，佐以古法黑糖熬制的Q弹波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 106621,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/bb5441ab575d478595c2b4cf8e3f82f9.jpg"
    }, {
      "id": 117133,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7ed49e6458364d8faf04850862797f1a.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "一个口味",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09
  }, {
    "id": 518,
    "name": "爆芋泥雪糕杯",
    "no": "1908020946066711",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。醇香芝士雪糕搭配满满手捣鲜芋泥、大粒芋头丁及香糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 64564,
      "url": "https://go.cdn.heytea.com/product/2019/08/02/tmp/4e90c2391b174547b164811e4d4256ab.jpg"
    }, {
      "id": 117147,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/c28d24b339d7480ea11c3f38d7fbca4d.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09
  }],
  "categoryAds": []
}, {
  "id": 3,
  "name": "果茶家族",
  "sort": 5,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/ac7a2ff85b6944fe83df06a79cc19834.jpg",
  "products": [{
    "id": 903,
    "name": "满杯红柚",
    "no": "2002116591295747",
    "description": "冷670ml  热500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 110879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/cb131fdf77a240759b8b7ca88b6cf60c.jpg"
    }, {
      "id": 117018,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/a680c4a889db4348ac18073afd876d16.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "精简",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58
  }, {
    "id": 987,
    "name": "多肉葡萄",
    "no": "2003233053569987",
    "description": "冷670ml 热500ml  精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 125859,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/a8cc4a72b43b434488f7be0a83b0ff10.jpg"
    }, {
      "id": 125860,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/befbd052ffd14a109af3512d762ef7b3.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30
  }, {
    "id": 988,
    "name": "芝芝莓莓 ®",
    "no": "2003236541062275",
    "description": "冷670ml 热500ml 选用定制草莓搭配清幽绿妍茶底新鲜现制，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 125863,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/6e368d7fa41d423eb08ea7f9824aed49.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "国内-精简",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }, {
    "id": 901,
    "name": "多肉芒芒甘露",
    "no": "2002112553238348",
    "description": "冷/热500ml  经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 135047,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/15/44ed201701ef406087100b0c1690daad.jpg"
    }, {
      "id": 117036,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/de106edd904148f185f6273835be0baf.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 1027,
    "name": "多肉芒芒甘露MAX",
    "no": "2004177218841779",
    "description": "冷670ml 多肉芒芒甘露升级大杯，果肉更多。经典芒芒与杨枝甘露的灵感碰撞，爆汁红柚粒撞上大块芒肉，精选清幽绿妍茶底，好喝不腻口。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 145003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/811f5f21b97b494baa7dd860e73ea3d2.jpg"
    }, {
      "id": 136964,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/16acc3dcfc944f65a031192183ed79fa.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "人气-精选",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }, {
    "id": 1025,
    "name": "莓莓芒芒甘露",
    "no": "2004173099743868",
    "description": "冷500ml 莓莓和芒芒甘露的首次灵感混搭。当季草莓搭配椰香芒果和红柚果粒，精选清新绿妍茶底，一次尝鲜两款人气饮品。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 145000,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/f59e648a91b646a0a240f57e8504a63a.jpg"
    }, {
      "id": 136961,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/35254a5c17104f14b867118cbf5e22bc.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "当季-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 902,
    "name": "芝芝芒芒",
    "no": "2002117627568550",
    "description": "冷670ml 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 110878,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/bcfb2519560e422e87d5d6e42311ab33.jpg"
    }, {
      "id": 117061,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/eb615f19fc7b4597b2bf2e7d72ecc49b.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "精选菜单",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19
  }],
  "categoryAds": []
}, {
  "id": 1,
  "name": "芝芝茗茶",
  "sort": 6,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/3de570175dbb4c74a6291e1b6df4eb6a.jpg",
  "products": [{
    "id": 723,
    "name": "芝芝绿妍",
    "no": "1911069353676862",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制绿茶，较普通绿茶，少了几分涩气，口感清澈，茉莉香气馥郁怡人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 86967,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/426b9ffb61b54d109c5e0a2fb17e6dd2.jpg"
    }, {
      "id": 116966,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e15fc76af0d5474db3fd7ea6f7c3038e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92
  }, {
    "id": 726,
    "name": "芝芝金玉",
    "no": "1911062610264848",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 86975,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/71fc31a5917849148bc363187ade15dc.jpg"
    }, {
      "id": 117003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9b2cde9273b34263a4de537e6c7fcdae.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75
  }, {
    "id": 728,
    "name": "芝芝金凤茶王",
    "no": "1911063020240079",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 86978,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/8c674061195c47abab7f0ba5389a9277.jpg"
    }, {
      "id": 117006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/55ae40fc3ddb4f34b637355fb05019e0.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75
  }, {
    "id": 729,
    "name": "芝芝嫣红2.0",
    "no": "1911064895831191",
    "description": "冷/热 500ml 芝士分装无法选择烤黑糖。喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 86979,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/66ee47abea144200ad9545038f07f3e1.jpg"
    }, {
      "id": 117365,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9bf19da3d15e47309857ca6f0a374a0f.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75
  }],
  "categoryAds": []
}, {
  "id": 15,
  "name": "喜茶咖啡",
  "sort": 8,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/50609654ded746f28ea60485a7e715b5.jpg",
  "products": [{
    "id": 990,
    "name": "雪山香草拿铁",
    "no": "2003273864428595",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。香草牛奶拿铁与香草鲜奶油雪顶灵感碰撞，缀以酥脆可口的碧根果碎，散发出柔和的坚果香及奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 127384,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/27/22757b7d429c49929da91462c19308ec.jpg"
    }, {
      "id": 129024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/627939658eff4a9cba5a848dac2d2956.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 79,
      "name": "含乳制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 989,
    "name": "雪山摩卡",
    "no": "2003271920921171",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。口感浓郁的可可牛奶摩卡，以入口即化的香草鲜奶油封顶，再轻撒上可可粉，交织出更加丰富的咖啡口感。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 129039,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/7a7b828bf69b4ad59a46ad9500c915e6.jpg"
    }, {
      "id": 129025,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/41e2e384cc824a63aebf2fc8285ea580.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 330,
    "name": "芝芝咖啡",
    "no": "1903209749549957",
    "description": "冷500ml  热360ml  咖啡外送可能会影响口感。意式奶咖与喜茶芝士的默契结合，带来更浓郁的奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 110986,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/0953921c70694dd08017c3566d21bb3e.jpg"
    }, {
      "id": 117366,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9ca5660ac7584711a1e687f880c17bd9.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58
  }, {
    "id": 332,
    "name": "咖啡波波冰",
    "no": "1903204953514910",
    "description": "冷480ml  热360ml  咖啡外送可能会影响口感。现萃Espresso沁入细密冰沙，佐以Q弹黑糖波波，混搭出新格调。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 83013,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/3db0e2c514574207972f6760b6aec5d3.jpg"
    }, {
      "id": 117130,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/b264c852833d4622ace76ae374f5d7d7.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58
  }, {
    "id": 786,
    "name": "拿铁(无糖)",
    "no": "1912139005357496",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 132284,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0347a8c6fbee4c9c9043fff1ab3a39dc.jpg"
    }, {
      "id": 132393,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/9f200190cba74818b933e8c19efbf267.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92
  }, {
    "id": 787,
    "name": "美式(无糖)",
    "no": "1912139775970865",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，原豆现磨，冲泡出纯粹饱满的咖啡香气。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 132285,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/baedb7f7c90343c68490f6ef3b56b39e.jpg"
    }, {
      "id": 132391,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/97facddd55fd4235bc6be7a6fbe96251.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 82,
      "name": "含咖啡",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26
  }],
  "categoryAds": []
}, {
  "id": 7,
  "name": "热饮推荐",
  "sort": 9,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/72b2d1e753464b5a837618e24bc857c3.jpg",
  "products": [{
    "id": 651,
    "name": "热阿华田波波",
    "no": "1910180943088468",
    "description": "500ml 喜茶×阿华田联名款，口感较甜腻。颗颗软糯的黑糖波波坠入鲜牛奶，结合活力满满的阿华田酷脆酱、阿华田脆脆与黑糖布蕾，口口香脆。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 94128,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/47a76b8d425a41ff988b12d4c1f16e5f.jpg"
    }, {
      "id": 116577,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/35198bd91dc24b02adf8c52a7381b3a3.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42
  }, {
    "id": 652,
    "name": "热奶茶波波",
    "no": "1910189005370634",
    "description": "500ml  经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制，黑糖波波与布蕾的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 94132,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/72bbb1e88e644114ab4fd66575e35efb.jpg"
    }, {
      "id": 116597,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/897eabd7269d4173b5bb7596eec497ad.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "国内",
    "is_enable": 1,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 1071,
    "name": "热香草拿铁",
    "no": "2005189358606057",
    "description": "热360ml。选用优质阿拉比卡咖啡豆拼配，清新香草，风味融于现萃咖啡拿铁，香气馥郁。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 150321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/3df5323771164e91a34a9b66b5a4a93f.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 843,
    "name": "热拿铁(无糖)",
    "no": "2001020664302393",
    "description": "360ML  选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [{
      "id": 132286,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/b0310c0436e142b8a137e459cba41872.jpg"
    }, {
      "id": 132394,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0d611cf4ca9a4a78996f5f6ae58cc94e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92
  }, {
    "id": 175,
    "name": "热满杯红柚",
    "no": "1812195149541014",
    "description": "500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。热气氤氲的茶汤，带出红柚的酸甜。若选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。如需选购冷饮，请在果茶家族内选购。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [{
      "id": 94137,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/53dfa505c0374a3c8c1e591ef5f62cfa.jpg"
    }, {
      "id": 117024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/02b673e5db164b0cb3f86f94f551de51.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58
  }, {
    "id": 780,
    "name": "热空气巧克力波波",
    "no": "1912127891374933",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 106302,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/38ff7925b24e45f396a53055be81e0b0.jpg"
    }, {
      "id": 116593,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/32ebc886275f4bd3b1822378c16bb880.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42
  }, {
    "id": 781,
    "name": "热m豆波波",
    "no": "1912127683531223",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 106303,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/bf760fd398bf4ae08b1c556550e385e6.jpg"
    }, {
      "id": 116574,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/7263f087592a428a8581d4e8c3f88e75.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 283,
    "name": "热芋泥波波鲜奶",
    "no": "1901144910150975",
    "description": "500ml 因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 106698,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/546e45531ff54693af2fa84cbcab8dff.jpg"
    }, {
      "id": 116601,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/aaef384a606640fbaa4c5f35ad3291e1.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "通用",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 734,
    "name": "热烤黑糖波波鲜奶",
    "no": "1911118126262032",
    "description": "500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 94130,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/e1f41f7109294b3b857b8bb170769ff7.jpg"
    }, {
      "id": 116589,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/9712450d1eda45ea8a421dfc05e4a824.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81
  }],
  "categoryAds": []
}, {
  "id": 6,
  "name": "纯茶",
  "sort": 10,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/43c745f3ead64208830401107c44eef2.jpg",
  "products": [{
    "id": 27,
    "name": "纯绿妍",
    "no": "1902229954555253",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制绿茶，气质淡雅芳幽，散发着清逸的茉莉香气，馥郁怡人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 82988,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/a2544f719c444feb92bffb1e0c806b15.jpg"
    }, {
      "id": 118894,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/a9633f04b796445cb7f06a3f35eacc6e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26
  }, {
    "id": 281,
    "name": "纯金玉",
    "no": "1901104953102101",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 82989,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/7fc2a04e49c64d4e9bacbd927c0b7831.jpg"
    }, {
      "id": 118896,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/0c371c50084a43e78378ae651d043cc8.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09
  }, {
    "id": 29,
    "name": "纯金凤茶王",
    "no": "1902225410210057",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 82990,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/ebd9855a95c8409786028992347908ab.jpg"
    }, {
      "id": 118897,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/d0ec2ad62d034109beded6cc0cf7e9f4.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09
  }, {
    "id": 31,
    "name": "纯嫣红2.0",
    "no": "1902229953995457",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 83919,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/22/72cffdd3f5e04521bbdefcbd4adb752d.jpg"
    }, {
      "id": 118898,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/84d30cb807ac48ccb3621318eb049e8d.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09
  }, {
    "id": 1049,
    "name": "纯奶茶",
    "no": "2004304604998948",
    "description": "冷/热500ml 精选阿萨姆红茶搭配牛奶调制，茶香浓郁，口感如丝般顺滑。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 141380,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/87b82a1b87cc4858a8b39d53e29ed690.jpg"
    }, {
      "id": 141374,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/c9c4430e4e55453bbdf318467867ae1d.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75
  }, {
    "id": 904,
    "name": "冷萃桂花绿",
    "no": "2002116613548083",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 110880,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/f8adbf0d089e45ddaddc1e84547bcdf7.jpg"
    }, {
      "id": 116987,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9734c2930f964a40a098413e435d0944.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2105,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1
    }],
    "labels": [{
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "1",
    "remark": "国内-纯茶",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49
  }, {
    "id": 1048,
    "name": "纯可可",
    "no": "2004300946915874",
    "description": "冷/热500ml 醇香可可搭配牛奶调制，交织出经典可可风味。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 141370,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/e0cbafb366934472bb72dca1d9882779.jpg"
    }, {
      "id": 141375,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/273d81568dc045eb8d3e17f9dbad52b5.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "23",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 21.70
  }],
  "categoryAds": []
}, {
  "id": 9,
  "name": "加料",
  "sort": 11,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/19047118303443b09ba73f82c54e4f03.jpg",
  "products": [{
    "id": 48,
    "name": "芝士",
    "no": "1908069651779130",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 60,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/22/BQiF2x5F5UHpdyrWGuomkha6cHCzajwacbSzJWrU.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66
  }, {
    "id": 51,
    "name": "加料冰淇淋",
    "no": "1908066825277032",
    "description": "不是单独吃的冰淇淋，如需购买直接吃的冰淇淋请在“喜茶制冰”系列选购。温馨提示：冰淇淋运送途中易融化，请酌情加购。1.加在饮品里（请您务必备注需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "冰激淋",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 133116,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/09/c912c1ab408b4003ada51a1e827f549e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66
  }, {
    "id": 95,
    "name": "脆波波",
    "no": "1908065534921229",
    "description": "脆波波无法添加在热饮里，比较适合添加在水果类饮品中。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 192,
      "url": "https://go.cdn.heytea.com/storage/products/2018/07/15/JUCyrE0xWBQJx2h702r36Hroj9iIvk1Sx8I4xqHU.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83
  }, {
    "id": 52,
    "name": "红柚果粒",
    "no": "1908064628880923",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 78,
      "url": "https://go.cdn.heytea.com/storage/products/2018/05/03/qOcLwgnk2Ag0yXKrlhgv4DGViu3T6xzEwho753il.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89
  }, {
    "id": 89,
    "name": "黑波波",
    "no": "1908060875032077",
    "description": "黑波波因为口味不搭，无法添加在任何含水果的饮品里。由于黑波波本身自带甜度，还请酌情调整饮品甜度。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 163,
      "url": "https://go.cdn.heytea.com/storage/products/2018/06/12/7STwzMTlbwolNHyOeTZHoEfOWZPp7yyEUUiwLLRx.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89
  }, {
    "id": 46,
    "name": "芋圆波波",
    "no": "1908063932379542",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 816,
      "url": "https://go.cdn.heytea.com/storage/products/2018/10/08/zyRESIONRRKD93SzsK82Bd4bbCCMwmmvuLeXbMVj.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83
  }],
  "categoryAds": []
}, {
  "id": 59,
  "name": "共同抗疫",
  "sort": 12,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/529845ef52584ca1adca3af88ebf1c66.jpg",
  "products": [{
    "id": 868,
    "name": "无接触配送",
    "no": "2001147783071999",
    "description": "防疫期间，您可通过订单备注及电话告知等方式，引导骑手将外卖商品放在指定位置，例如：悬挂门把手、放置大堂桌面，避免接触，降低风险。由于茶饮均为现点现制，高峰期外送时间预计为1小时左右，建议您提前点单。如果您有任何建议或遇到配送、撒漏等问题，可拨打本店电话反馈（高峰期可能会出现忙线，还请谅解），也可前往喜茶GO-我的-联系客服，我们会尽快为您处理。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 106625,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/a70891bef83a4aa2b0f7c5b7d7ca1fd5.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2040,
      "name": "无接触配送",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 884,
    "name": "日常防疫",
    "no": "2001291964122103",
    "description": "1.尽量避免出门，出门必须戴上口罩；2.避免在无保护的情况下接触家禽家畜；3.烹制时彻底煮熟肉类和蛋类；4.咳嗽和打喷嚏时使用纸巾或弯曲手肘掩盖口鼻，立刻消毒双手；5.多喝温水，保持喉咙湿润；6.勤洗手勤消毒；7.规律作息。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 109315,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/59c79fe328ce49c98b469e5e3893bc69.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2075,
      "name": "日常防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 887,
    "name": "门店防疫",
    "no": "2001290337601885",
    "description": "1.店员每日测量体温，全天佩戴口罩手套，每小时洗手消毒。2.每小时消毒店内可接触物，每四小时清洗消毒餐具。3.最大程度保持门店通风透气。4.门店现仅接受喜茶GO小程序点单，降低接触频次。5.顾客及骑手须佩戴口罩方可进店。6.骑手进店前测量体温，所有外卖订单采取无接触配送。我们希望为大家提供安全的环境，愉快喝茶。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 109320,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/fce916a50b5b46bdb31e862fe50f59b5.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2078,
      "name": "门店防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 886,
    "name": "医护关怀 优先制作",
    "no": "2001296678335151",
    "description": "所有医院和防疫中心的外送订单，我们都将予以优先制作，尽微薄之力为一线医生和护士提供一些支持。愿医务人员们平安凯旋。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 109319,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/f57d3859f66b4ffe9a43e641d023fc2b.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 2077,
      "name": "医护关怀 优先制作",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }],
  "categoryAds": []
}, {
  "id": 8,
  "name": "灵感提示",
  "sort": 13,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/6d5e68f5b2bd4fa2bb50f94e6ac0a512.jpg",
  "products": [{
    "id": 386,
    "name": "好果",
    "no": "1905133973948690",
    "description": "选用水果或nfc(100%鲜榨非浓缩还原)鲜果汁，不添加任何色素，香精。饮品颜色（如粉色）完全使用新鲜水果调色。因鲜果具有差异性，颜色，口味有时会有细微差别，希望能理解~",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 43204,
      "url": "https://go.cdn.heytea.com/product/2019/05/13/tmp/5ff509ec0bef4d17845fc8f788240945.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1299,
      "name": "好果",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 41,
    "name": "联系我们",
    "no": "1905150527205146",
    "description": "如有配送、洒漏、口味等问题，请尽快联系我们，我们将尽快解决为您重做。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 50,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ygQajpQgwl61yLFjiPNlKb27irYd9Wrkwf8udrZG.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1321,
      "name": "联系我们",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 42,
    "name": "星球须知",
    "no": "1905274655799328",
    "description": "1.由于鲜奶打制，配送中芝士/轻芝士饮品可能会出现芝士下沉和茶混合的现象。2.冰沙类饮品配送中可能出现融化。3.热茶饮均为500ml规格，热咖啡均为360ml规格，望周知谅解。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 51,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ecr5boTxqal4bpRBoK4pqks8SGlBxiBwgvAVWYDG.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1322,
      "name": "星球须知",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 43,
    "name": "好茶",
    "no": "1907103183786764",
    "description": "使用原产地定制原茶茶叶，我们希望用一杯好茶激发你的一份灵感。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 52,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/XxWAOA4cykEeUwAbKZLuIHLEdXS96M4NSBLEOsEp.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1323,
      "name": "好茶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 44,
    "name": "好奶",
    "no": "1907102611854675",
    "description": "选用高品质冷藏鲜奶，高品质淡奶油，芝士使用鲜奶打制，不使用任何脂质沫（奶精、奶盖粉）。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 53,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/qS2cxdfDrzgCmAMATXlclkaXecBXLGWGMPBkl60P.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1324,
      "name": "好奶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 45,
    "name": "好糖",
    "no": "1907106785814826",
    "description": "使用优质糖分，可于下单时按个人口味调整添加的糖分。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 54,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/17YCgUYwldCLGHEcNDJPjM68TQ9PaEUpp6voCUTk.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1325,
      "name": "好糖",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9992",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8842.48
  }, {
    "id": 104,
    "name": "过敏原",
    "no": "1905274126391239",
    "description": "部分饮品中含有乳制品、菠萝、芒果、大麦、小麦、麦芽制品等致敏物，请酌情选择。部分饮品中含有果肉、珍珠、芋圆等大颗粒物，请勿大力吸入，老人、儿童、孕妇请谨慎饮用。所有茶类饮品皆含咖啡因，如对咖啡因过敏，请谨慎选择。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 289,
      "url": "https://go.cdn.heytea.com/storage/products/2018/08/09/sDzZBhV27AdVpth9bwpVSnY1WhreD3EN02MqE0r2.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1327,
      "name": "过敏原",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 462,
    "name": "自带杯 减2元",
    "no": "1906215019076002",
    "description": "我们更鼓励大家自带杯到店饮茶，并且每杯饮品可享受减2元优惠。减少使用饮品杯，一起为地球做好事。*自带杯指定规格：洁净可受热，杯口≥6CM，容量≥500ML。本活动仅限门店现场点单，不与其他优惠共享，感谢理解。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [{
      "id": 54642,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/b8d76851e21b469c98978adccec77715.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1273,
      "name": "自带杯 减2元",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67
  }, {
    "id": 465,
    "name": "让垃圾各归各家",
    "no": "1906210816159145",
    "description": "我们现已在门店设置了分类垃圾桶，请将垃圾分好类再入桶，和茶茶一起分清标识，环保不迷路。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [{
      "id": 54640,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/0e79195904794fb6b23b466d00694eb8.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1276,
      "name": "让垃圾各归各家",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07
  }, {
    "id": 463,
    "name": "一起使用纸吸管",
    "no": "1906210475943584",
    "description": "少取用吸管，支持环保减塑。我们现已提供环保纸吸管及常规吸管两项选择，由于纸吸管长时间浸泡强度易下降，取用纸吸管的朋友请尽快饮用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 10,
    "images": [{
      "id": 54615,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/35794eb50dd344f488affedffa62d170.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1274,
      "name": "一起使用纸吸管",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07
  }, {
    "id": 464,
    "name": "不打包 更环保",
    "no": "1906215007742339",
    "description": "一起来参与不打包行动。如需打包，请选择店内的可降解打包袋，更欢迎大家自带环保袋噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [{
      "id": 54641,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/f2523f450e9b4c4bbce58d88dd83bdf4.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1275,
      "name": "不打包 更环保",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07
  }, {
    "id": 466,
    "name": "纸巾按需取用",
    "no": "1906216036305300",
    "description": "节约一张纸，守护一棵树。请按需取用店内纸巾，减少不必要的浪费。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [{
      "id": 54639,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/fad86c295f2840bda47d06600a8c9e02.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1277,
      "name": "纸巾按需取用",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07
  }, {
    "id": 467,
    "name": "循环利用 激发灵感",
    "no": "1906212821448901",
    "description": "我们提供的外带纸袋、饮品纸杯及纸杯套都是由可回收材料制成，用灵感点亮生活的每一个瞬间，希望每一个被带走的纸袋、杯套及纸杯，都能在大家的妙手下得到二次创作使用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [{
      "id": 54638,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/81411128480f45bf8dcd56038b5d66cb.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [{
      "id": 1278,
      "name": "循环利用 激发灵感",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0
    }],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "998",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 883.19
  }],
  "categoryAds": []
}, {
  "id": 11,
  "name": "波波家族",
  "sort": 7,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/0dd0e6e55c4b4f119fadda81b0a7b3f8.jpg",
  "products": [{
    "id": 706,
    "name": "豆豆波波茶",
    "no": "1911010700649582",
    "description": "冷/热500ml 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [{
      "id": 87818,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/09/5f9e812aec954a8b88a184ca6d81e8cc.jpg"
    }, {
      "id": 116603,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/34f79e5ab5e844179bc4c0263a0ad57c.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "最新",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 68,
    "name": "烤黑糖波波鲜奶",
    "no": "1812209997985397",
    "description": "冷480ml 热500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [{
      "id": 71356,
      "url": "https://go.cdn.heytea.com/product/2019/08/31/tmp/1258f79c91c04932bec8b09eb7eebb90.jpg"
    }, {
      "id": 116584,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/1b653ccc95344896bdf1f0b0ddca5be1.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "唯一",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81
  }, {
    "id": 133,
    "name": "芋泥波波鲜奶",
    "no": "1812279955525098",
    "description": "冷/热500ml  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [{
      "id": 106697,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/9e614ed804284ed888b1913c4459ab93.jpg"
    }, {
      "id": 116599,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/fe91df89885d42ffa8e8c0c58d34c6e5.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 770,
    "name": "m豆波波",
    "no": "1912064611771955",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [{
      "id": 106300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/c067c03758e4440ea8463743dd9f6941.jpg"
    }, {
      "id": 116575,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/ffd1a8461b8141b09d8d0d466cffc82e.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36
  }, {
    "id": 771,
    "name": "空气巧克力波波",
    "no": "1912062784685912",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [{
      "id": 106299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/1b193e1b37e84fb49e0fd0101b58a6a2.jpg"
    }, {
      "id": 116594,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/852db33dcf4d4d17b13971a6c42dc4e2.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42
  }, {
    "id": 890,
    "name": "芋泥黑糖波波",
    "no": "2002020137219017",
    "description": "冷/热500ml 因芋泥易氧化，为保持最佳口感，建议于一小时内饮用完毕。手捣新鲜芋泥融入顺滑牛奶，Q弹黑波波甜香浓郁。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [{
      "id": 109837,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/02/b42a4e5690d742e8abab89610bd865b2.jpg"
    }, {
      "id": 117358,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/e7691652c4a046bdbd6fbb7862436226.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }, {
    "id": 334,
    "name": "奶茶波波冰",
    "no": "1903205298100979",
    "description": "冷480ml 热500ml  由于冰沙外送易化，口感会略受影响，敬请谅解。经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制细腻冰沙，黑糖波波和冰淇淋球的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [{
      "id": 106879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/17/6fb20e4943944d7bb00a0034563c664a.jpg"
    }, {
      "id": 116596,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/6217859b873f47be860b3f37ed5701d4.jpg"
    }],
    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [{
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541"
    }, {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA"
    }],
    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47
  }],
  "categoryAds": []
}];
exports.default = _default;

/***/ }),
/* 39 */
/*!*************************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/config/baseUrl.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var baseConfig = {
  imgHttpsUrl: 'https://96009.citybigdata.cn/beta/static/miniprogram/heytea' // 静态图片访问(本地开发)
};
var _default = Object.assign({}, baseConfig);
exports.default = _default;

/***/ }),
/* 40 */
/*!**********************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/store/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 41));
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    userInfo: {
      nickname: '',
      level: 'Lv1'
    },
    isLogin: false
  },
  mutations: {
    SET_USERINFO: function SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_ISLOGIN: function SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),
/* 41 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 42 */
/*!**********************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/common/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hexToRgba = function hexToRgba(hex, opacity) {
  // 十六进制颜色转rgba
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
};
module.exports = {
  hexToRgba: hexToRgba // 十六进制颜色转rgba
};

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 58)();
module.exports = runtime;

/***/ }),
/* 58 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 59 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/chenh/Desktop/weapp-heytea/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimation = createAnimation;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {
    (0, _classCallCheck2.default)(this, MPAnimation);
    this.options = options;
    // 在iOS10+QQ小程序平台下，传给原生的对象一定是个普通对象而不是Proxy对象，否则会报parameter should be Object instead of ProxyObject的错误
    this.animation = uni.createAnimation(_objectSpread({}, options));
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  (0, _createClass2.default)(MPAnimation, [{
    key: "_nvuePushAnimates",
    value: function _nvuePushAnimates(type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    }
  }, {
    key: "_animateRun",
    value: function _animateRun() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles
        }, config), function (res) {
          resolve();
        });
      });
    }
  }, {
    key: "_nvueNextAnimate",
    value: function _nvueNextAnimate(animates) {
      var _this2 = this;
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {
        var styles = obj.styles,
          config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    }
  }, {
    key: "step",
    value: function step() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.animation.step(config);
      return this;
    }
  }, {
    key: "run",
    value: function run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);
    }
  }]);
  return MPAnimation;
}();
var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'];
var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {
    var _this$animation;
    (_this$animation = this.animation)[type].apply(_this$animation, arguments);
    return this;
  };
});
function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map