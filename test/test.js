// call 例子

function person(a, b) {
  console.log(this.name);
  console.log(a);
  console.log(b);
}

var wjy = {
  name: 'wjy',
};

person.call(wjy, 1, 2); // wjy,1,2

// 原理
/*
wjy = {
name:"wjy",
person:function(a,b) {
log(this.name)
log(a)
log(b)
 */

Function.prototype.newCall = function (obj) {
  obj.p = this || window;
  let args = Array.prototype.slice.call(arguments, 1);
  let result = obj.p(...args);
  delete obj.p;
  return result;
};

Function.prototype.newApply = function (obj, arr = []) {
  obj.p = this || window;
  let result = obj.p(...args);
  delete obj.p;
  return result;
};

person.bind(egg)(); // ==> person.call(egg)

Function.prototype.newBind = function (obj) {
  var that = this;
  var arg = Array.prototype.slice.call(arguments, 1);
  var newf = function () {
    var arg2 = Array.prototype.slice.call(arguments);

    // 是否用过new
    if (this instanceof newf) {
      that.apply(this, arg.concat(arg2));
    } else {
      that.apply(obj, arg.concat(arg2));
    }
  };
  var o = function () {};
  o.prototype = that.prototype;
  newf.prototype = new o();
  return newf;
};

// JSONP原理
// script 的 默认 type = text/javascript 默认执行

let jsonp = function (url, data = {}, callback) {
  let dataStr = url.indexOf('?') === -1 ? '?' : '&';
  for (const key in data) {
    dataStr += `${key} = ${data[key]}&`;
  }

  let cb_name = 'jsonpCallback';
  dataStr += `callback=` + cb_name;
  let scriptBody = document.createElement('script');
  scriptBody.src = url + dataStr;
  window[cb_name] = function (data) {
    callback(data);
    document.body.removeChild(scriptBody);
  };

  document.body.appendChild(scriptBody);
};

// new
function mynew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res;
  }
  return obj;
}

function myInstance(Fn, obj) {
  let prototype = Fn.prototype;
  let __proto__ = obj.__proto__;
  while (__proto__) {
    if (prototype === __proto__) {
      return true;
    }
    __proto__ = __proto__.__proto__;
  }
  return false;
}
