// 深克隆
function deepClone(obj, map = new Map()) {
  // 1. 判断是否是对象
  if (typeof obj === 'object' && obj !== null) {
    // 3. 是对象后判断是否有缓存
    let cache = map.get(obj);
    // 4.如果有缓存,就直接返回缓存
    if (cache) {
      return cache;
    }
    // 5. 判断是不是数组
    let isArray = Array.isArray(obj);
    // 6. 设置结果
    let result = isArray ? [] : {};
    // 7. 缓存
    map.set(obj, result);
    // 8. 如果是数组
    if (isArray) {
      obj.forEach((item, index) => {
        // 9. 子元素也要进行一次深克隆
        result[index] = deepClone(item, map);
      });
    } else {
      // 10. 遍历对象
      for (let key in obj) {
        result[key] = deepClone(obj[key], map);
      }
    }
    // 11. 返回结果
    return result;
  } else {
    // 2. 不是对象,就直接返回
    return obj;
  }
}
