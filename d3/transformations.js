// 1. 将数组以特殊的方式进行分组，结果为InternMao
// 例子看这个https://observablehq.com/@d3/d3-flatgroup
import { InternMap } from 'internmap';

function identity(x) {
  return x;
}

// 对数组进行分组，第一个identity 是对最终结果进行处理，第二个identity是对最后一个回调函数的结果处理
function group(values, ...keys) {
  return nest(values, identity, identity, keys);
}

// 这里就用Array.from 把最后的map结果，转为数组
function groups(values, ...keys) {
  return nest(values, Array.from, identity, keys);
}

// 将分组好后的数组，转为 key1,key2,kye...., [.....]
function flatten(groups, keys) {
  for (let i = 1, n = keys.length; i < n; ++i) {
    groups = groups.flatMap((g) =>
      g.pop().map(([key, value]) => [...g, key, value]),
    );
  }
  return groups;
}

function flatGroup(values, ...keys) {
  return flatten(groups(values, ...keys), keys);
}

// 等效于group，但每个复合键返回唯一值，而不是数组，如果键不唯一，则抛出。
// 这个就是对最后结果进行处理了
function index(values, ...keys) {
  return nest(values, identity, unique, keys);
}

function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}
function unique(values) {
  if (values.length !== 1) throw new Error('duplicate key');
  return values[0];
}

export function rollup(values, reduce, ...keys) {
  return nest(values, identity, reduce, keys);
}

export function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

function nest(values, map, reduce, keys) {
  return (function regroup(values, i) {
    // 这里是进行到最后，给出处理结果，然后这个reduce在group下是直接return values
    if (i >= keys.length) return reduce(values);

    // 创建结果数组
    const groups = new InternMap();

    // 获取到对应的处理器
    const keyof = keys[i++];

    // 索引
    let index = -1;

    for (const value of values) {
      // 执行这个回调函数，有三个参数，并得到相应的结果
      const key = keyof(value, ++index, values);
      // 如果之前存过，就要用push方法
      const group = groups.get(key);
      // 给这个key存入值
      if (group) group.push(value);
      else groups.set(key, [value]);
    }

    // 正常来说，我们只需要执行一次即可，但如果它还需要对处理过的数据再进行分组

    for (const [key, values] of groups) {
      // 继续对处理过的结果处理
      groups.set(key, regroup(values, i));
    }

    return map(groups);
  })(values, 0);
}
