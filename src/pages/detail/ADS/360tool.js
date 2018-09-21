// export const mediav = {

// }

var jqLite = JQLite,
  jqCache = JQLite.cache = {},
  jqId = 1,
  jqName = JQLite.expando = 'mv-' + new Date().getTime()

export const addEventListenerFn = (window.document.addEventListener ?
  function (element, type, fn) {
    element.addEventListener(type, fn, false);
  } :
  function (element, type, fn) {
    element.attachEvent('on' + type, fn);
  })
export const removeEventListenerFn = (window.document.removeEventListener ?
  function (element, type, fn) {
    element.removeEventListener(type, fn, false);
  } :
  function (element, type, fn) {
    element.detachEvent('on' + type, fn);
  });

const JQLite = element => {
  if (element instanceof JQLite) {
    return element;
  }
  var argIsString;
  if (isString(element)) {
    element = trim(element);
    argIsString = true;
  }
  if (!(this instanceof JQLite)) {
    if (argIsString && element.charAt(0) !== '<') {
      throw Error('nosel');
    }
    return new JQLite(element);
  }
  if (argIsString) {
    if (msie && msie > 8) jqLiteAddNodes(this, jqLiteParseHTML(element));
    else {
      var div = document.createElement('div');
      // Read about the NoScope elements here:
      // http://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
      div.innerHTML = '<div>&#160;</div>' + element; // IE insanity to make NoScope elements work!
      div.removeChild(div.firstChild); // remove the superfluous div
      jqLiteAddNodes(this, div.childNodes);
      var fragment = jqLite(document.createDocumentFragment());
      fragment.append(this); // detach the elements from the temporary DOM div.
    }
  } else if (isFunction(element)) {
    jqLiteReady(element);
  } else {
    jqLiteAddNodes(this, element);
  }
}

export const Uid = () => {
  const getHash = str => {
    var hash = 1,
      charCode = 0,
      idx;
    if (str) {
      hash = 0;
      for (idx = str.length - 1; idx >= 0; idx--) {
        charCode = str.charCodeAt(idx);
        hash = (hash << 6 & 268435455) + charCode + (charCode << 14);
        charCode = hash & 266338304;
        hash = charCode != 0 ? hash ^ charCode >> 21 : hash;
      }
    }
    return hash;
  }
  var currentTime = new Date();
  var timestamp = new Date(currentTime.toDateString()).getTime() + (currentTime.getHours() * 60 + parseInt(currentTime.getMinutes() / 5)) * 60 * 1000;
  return ("" + getHash(document.referrer) + timestamp + getHash(document.cookie.replace(/(?:(?:^|.*;\s*)v\s*\=\s*([^;]*).*$)|^.*$/, "$1"))).substr(0, 32);
}

const jqLiteIsTextNode = html => (!HTML_REGEXP.test(html))
const jqLiteBuildFragment = (html, context) => {
  var tmp, tag, wrap,
    fragment = context.createDocumentFragment(),
    nodes = [],
    i;
  if (jqLiteIsTextNode(html)) {
    // Convert non-html into a text node
    nodes.push(context.createTextNode(html));
  } else {
    // Convert html into DOM nodes
    tmp = fragment.appendChild(context.createElement('div'));
    tag = (TAG_NAME_REGEXP.exec(html) || ['', ''])[1].toLowerCase();
    wrap = wrapMap[tag] || wrapMap._default;
    tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];

    // Descend through wrappers to the right content
    i = wrap[0];
    while (i--) {
      tmp = tmp.lastChild;
    }
    nodes = concat(nodes, tmp.childNodes);
    tmp = fragment.firstChild;
    tmp.textContent = '';
  }

  // Remove wrapper from fragment
  fragment.textContent = '';
  fragment.innerHTML = ''; // Clear inner HTML
  forEach(nodes, function (node) {
    fragment.appendChild(node);
  });
  return fragment;
}

const jqLiteParseHTML = (html, context) => {
  context = context || window.document;
  var parsed;

  if ((parsed = SINGLE_TAG_REGEXP.exec(html))) {
    return [context.createElement(parsed[1])];
  }
  if ((parsed = jqLiteBuildFragment(html, context))) {
    return parsed.childNodes;
  }
  return [];
}
const jqLiteAddNodes = (root, elements) => {
  if (elements) {
    // if a Node (the most common case)
    if (elements.nodeType) {
      root[root.length++] = elements;
    } else {
      var length = elements.length;
      // if an Array or NodeList and not a Window
      if (typeof length === 'number' && elements.window !== elements) {
        if (length) {
          for (var i = 0; i < length; i++) {
            root[root.length++] = elements[i];
          }
        }
      } else {
        root[root.length++] = elements;
      }
    }
  }
}

const jqLiteReady = fn => {
  function trigger() {
    removeEventListenerFn(window.document, 'DOMContentLoaded', trigger)
    removeEventListenerFn(window, 'load', trigger)
    fn();
  }
  // check if document is already loaded
  if (window.document.readyState === 'complete') {
    window.setTimeout(fn);
  } else {
    // We can not use jqLite since we are not done loading and jQuery could be loaded later.
    // Works for modern browsers and IE9
    addEventListenerFn(window.document, 'DOMContentLoaded', trigger);
    addEventListenerFn(window, 'load', trigger);
  }
}


const baseRandom = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)))

export const sample = (collection, n) => {
  var index = -1,
    result = collection,
    length = result.length,
    lastIndex = length - 1;

  n = Math.min(n < 0 ? 0 : (+n || 0), length);
  while (++index < n) {
    var rand = baseRandom(index, lastIndex),
      value = result[rand];

    result[rand] = result[index];
    result[index] = value;
  }
  result.length = n;
  return result;
}

export const shuffle = collection => (sample(collection, Number.POSITIVE_INFINITY))
export const isUndefined = value => (typeof value === 'undefined')
export const isFunction = value => (typeof value === 'function')
export const isObject = value => (value !== null && typeof value === 'object')
export const isNumber = value => (typeof value === 'number')
export const isArray = a => ("[object Array]" === Object.prototype.toString.call(a))
export const isWindow = obj => (obj && obj.window === obj)
export const isString = value => (typeof value === 'string')
export const trim = value => (isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value)
export const lowercase = string => (isString(string) ? string.toLowerCase() : string)
export const concat = (array1, array2, index) => (array1.concat(slice(array2, index)))
export const slice = (a, pos) => {
  var b = [],
    l = a.length,
    p = pos || l,
    i;
  for (i = 0; i !== l && p > i; b.push(a[i++])) {}
  return b;
}


export const isArrayLike = obj => {
  if (obj == null || isWindow(obj)) return false;
  if (isArray(obj) || isString(obj) || (JQLite && obj instanceof JQLite)) return true;
  var length = 'length' in Object(obj) && obj.length;
  return isNumber(length) &&
    (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'function')
}


export const forEach = (obj, iterator, context) => {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else if (isObject(obj) && isNumber(obj.length)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === 'function') {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}





//msie
var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
if (isNaN(msie)) {
  msie = parseInt((/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)) || [])[1], 10);
}
var DASH_LOWERCASE_REGEXP = /-([a-z])/g,
  MS_HACK_REGEXP = /^-ms-/,
  NODE_TYPE_ELEMENT = 1,
  NODE_TYPE_ATTRIBUTE = 2,
  NODE_TYPE_TEXT = 3,
  NODE_TYPE_COMMENT = 8,
  NODE_TYPE_DOCUMENT = 9,
  NODE_TYPE_DOCUMENT_FRAGMENT = 11,
  BOOLEAN_ATTR = true,
  CLASS_ARRIBUTE = msie && msie < 8 ? 'className' : 'class',
  SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
  HTML_REGEXP = /<|&#?\w+;/,
  TAG_NAME_REGEXP = /<([\w:-]+)/,
  XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
  wrapMap = {
    'option': [1, '<select multiple="multiple">', '</select>'],
    'thead': [1, '<table>', '</table>'],
    'col': [2, '<table><colgroup>', '</colgroup></table>'],
    'tr': [2, '<table><tbody>', '</tbody></table>'],
    'td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    '_default': [0, '', '']
  };




// sio
export const _removeScriptTag = scr => {
  if (scr.clearAttributes) {
    scr.clearAttributes();
  } else {
    for (var attr in scr) {
      if (scr.hasOwnProperty(attr)) {
        delete scr[attr];
      }
    }
  }
  if (scr && scr.parentNode) {
    scr.parentNode.removeChild(scr);
  }
  scr = null;
}

export const _createScriptTag = (scr, url, charset) => {
  scr.setAttribute('type', 'text/javascript');
  charset && scr.setAttribute('charset', charset);
  scr.setAttribute('src', url);
  document.getElementsByTagName('head')[0].appendChild(scr);
}

export const log = url => {
  var img = new Image(),
    key = 'mediav_sio_log_' + Math.floor(Math.random() *
      2147483648).toString(36);
  window[key] = img;
  img.onload = img.onerror = img.onabort = function () {
    img.onload = img.onerror = img.onabort = null;
    window[key] = null;
    img = null;
  };
  img.src = url;
}
export const callByServer = (url, callback, opt_options) => {
  var scr = document.createElement('SCRIPT'),
    prefix = 'jsonp',
    callbackName,
    callbackImpl,
    options = opt_options || {},
    charset = options['charset'],
    queryField = options['queryField'] || 'callback',
    timeOut = options['timeOut'] || 0,
    timer,
    reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
    matches;
  if (isObject(queryField)) {

    var result = [];
    forEach(queryField, function (val, key) {
      result.push(key + '=' + val)
    })
    queryField = result.join('&') + '&jsonp'
  }


  if (isFunction(callback)) {
    callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
    window[callbackName] = getCallBack(0);
  } else if (isString(callback)) {
    callbackName = callback;
  } else {
    if (matches = reg.exec(url)) {
      callbackName = matches[2];
    }
  }

  if (timeOut) {
    timer = setTimeout(getCallBack(1), timeOut);
  }

  //如果用户在URL中已有callback，用参数传入的callback替换之
  url = url.replace(reg, '\x241' + queryField + '=' + callbackName);

  if (url.search(reg) < 0) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
  }
  _createScriptTag(scr, url, charset);

  const getCallBack = (onTimeOut) => {
    /*global callbackName, callback, scr, options;*/
    return function () {
      try {
        if (onTimeOut) {
          options.onfailure && options.onfailure();
        } else {
          clearTimeout(timer);
          callback.apply(window, arguments);
        }
        window[callbackName] = null;
        delete window[callbackName];
      } catch (exception) {
        // ignore the exception
      } finally {
        _removeScriptTag(scr);
      }
    }
  }
}
