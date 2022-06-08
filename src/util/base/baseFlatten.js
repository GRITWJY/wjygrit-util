var arrayPush = require('../arrayPush');

function baseFlatten(array, depth, predicate, result) {
  // 这里是用来遍历的， -1 是因为之后会++
  var index = -1,
    length = array.length;

  // 这里我就简单一点了，直接用Array.isArray代替
  predicate || (predicate = Array.isArray);
  // 结果数组
  result || (result = []);

  while (++index < length) {
    // 获取这个下标的值
    var value = array[index];
    // 层级大于0，即需要展开， 以及可以展开
    if (depth > 0 && predicate(value)) {
      // depth》0且是数组
      if (depth > 1) {
        // 如果深度大于1，就继续递归执行
        baseFlatten(value, depth - 1, predicate, result);
      } else {
        // 把值放入数组中，把数组放入数组中,只有1个层级的时候，就把这个数组展开
        arrayPush(result, value);
      }
    } else {
      // 如果不可以展开
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;
