// 返回给定的迭代器中的最大和最小值，以自然数序列

export function extend(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        // 过滤掉null值
        if (min === undefined) {
          // 没有最小值时
          if (value >= value) min = max = value; // 做初始化，并过滤掉NULL值
        } else {
          // 正常比较
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (const value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          // 没有最小值时
          if (value >= value) min = max = value; // 做初始化，并过滤掉NULL值
        } else {
          // 正常比较
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}
