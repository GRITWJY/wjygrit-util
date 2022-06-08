// max和maxIndex就没写了

// 可以过滤 undefined, null ,NaN
export function min(values, valueof) {
  let min;
  // 正常排序
  if (valueof === undefined) {
    for (const value of values) {
      // value >= value 过滤掉NaN
      if (
        value != null &&
        (min > value || (min === undefined && value >= value))
      ) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (
        (value = valueof(value, ++index, values)) != null &&
        (min > value || (min === undefined && value >= value))
      ) {
        min = value;
      }
    }
  }
  return min;
}

export function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  // 正常排序
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      // value >= value 过滤掉NaN
      if (
        value != null &&
        (min > value || (min === undefined && value >= value))
      ) {
        (min = value), (minIndex = index);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (
        (value = valueof(value, ++index, values)) != null &&
        (min > value || (min === undefined && value >= value))
      ) {
        (min = value), (minIndex = index);
      }
    }
  }
  return min;
}
