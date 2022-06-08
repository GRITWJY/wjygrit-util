// 返回众数，相同时返回第一个
/*
 * d3.mode(["5", 5, "5", "5", 5, 4, 4, 4, 4], d => +d) // 5
 *
 * 不能进行类型转换
 * d3.mode(["5", 5, "5", "5", 5, 4, 4, 4, 4]) // 4
 * */

import { InternMap } from 'internmap';

export function mode(values, valueof) {
  const counts = new InternMap();
  if (valueof === undefined) {
    for (const value of values) {
      // 过滤null和NaN
      if (value != null && value >= value) {
        // 存储个数，注意这里用的是Internmap
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
  } else {
    let index = -1;
    for (const value of values) {
      if ((value = valueof(value, ++index, values)) != null && value >= value) {
        counts.set(value, (counts.get(value) || 0) + 1);
      }
    }
  }

  let modeValue;
  let modeCount = 0;
  for (const [value, count] of counts) {
    if (count > modeCount) {
      modeCount = count;
      modeValue = value;
    }
  }
  return modeValue;
}
