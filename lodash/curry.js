function curry(fn) {
  // 直接返回一个函数，因为最后的调用都是用这个返回的函数的
  // 为什么不使用匿名函数？因为如果传入参数 args.length 小于 fn 函数的形参个数 fn.length，需要重新递归
  return function curryFn(...args) {
    if (args.length < fn.length) {
      // 传入的参数小于函数的参数，要返回一个函数
      // 这个函数是直接被调用的，所以匿名函数也没事，只要让它调用时返回curryFn就行
      return function () {
        // 包之前的参数也拼接进去
        return curryFn(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
}
function checkByRegExp(regExp, string) {
  return regExp.test(string);
}

console.log(checkByRegExp(/^1\d{10}$/, '15010001000')); // 校验电话号码

//进行柯里化
let _check = curry(checkByRegExp);
//生成工具函数，验证电话号码
let checkCellPhone = _check(/^1\d{10}$/);
//生成工具函数，验证邮箱
let checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

console.log(checkCellPhone('18642838455')); // 校验电话号码
checkCellPhone('13109840560'); // 校验电话号码
checkCellPhone('13204061212'); // 校验电话号码

checkEmail('test@163.com'); // 校验邮箱
checkEmail('test@qq.com'); // 校验邮箱
checkEmail('test@gmail.com'); // 校验邮箱
