// 分位数
/*
* var a = [0, 10, 30];
d3.quantile(a, 0); // 0
d3.quantile(a, 0.5); // 10
d3.quantile(a, 1); // 30
d3.quantile(a, 0.25); // 5
d3.quantile(a, 0.75); // 20
d3.quantile(a, 0.1); // 2
* */
export function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length)) return;

  // 如果只有一个数字，直接返回最小值
  // 如果p小于0或等于0，直接返回最小值就行
  if ((p = +p) <= 0 || n < 2) return min(values);

  // 如果大于1，直接返回最大值
  if (p >= 1) return max(values);

  var n,
    i = (n - 1) * p,
    i0 = Math.floor(i),
    value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
    value1 = min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

// ascending 升序
// Returns -1 if a is less than b, or 1 if a is greater than b, or 0.
function ascending(a, b) {
  return a == null || b == null
    ? NaN
    : a < b
    ? -1
    : a > b
    ? 1
    : a >= b
    ? 0
    : NaN;
}

function ascendingDefined(a, b) {
  return (
    a == null ||
    !(a >= a) - (b == null || !(b >= b)) ||
    (a < b ? -1 : a > b ? 1 : 0)
  );
}

function compareDefined(compare = ascending) {
  if (compare === ascending) return ascendingDefined;
  if (typeof compare !== 'function')
    throw new TypeError('compare is not a function');
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function rank(values, valueof = ascending) {
  // 研究js中的iterator
  /**
   * Symbol.iterator 为每个对象定义了默认的迭代器。
   */
  if (typeof values[Symbol.iterator] !== 'function')
    throw new TypeError('values is not iterable');
  let V = Array.from(values);
  const R = new Float64Array(V.length);
  // Function.length 指明函数参数的形参个数
  // 如果为一个，就表明自定义过了， 就执行valueof 这个方法，然后把排序默认为升序
  if (valueof.length !== 2) (V = V.map(valueof)), (valueof = ascending);
  const compareIndex = (i, j) => valueof(V[i], V[j]);
  let k, r;
  // todo: Uint32Array
  Uint32Array.from(V, (_, i) => i)
    .sort(
      valueof === ascending
        ? (i, j) => ascendingDefined(V[i], V[j])
        : compareDefined(compareIndex),
    )
    .forEach((j, i) => {
      const c = compareIndex(j, k === undefined ? j : k);
      if (c >= 0) {
        if (k === undefined || c > 0) (k = j), (r = i);
        R[j] = r;
      } else {
        R[j] = NaN;
      }
    });
  return R;
}

// rank  等级

/*
 1. 给出数组的每个元素的等级，都是自然数时，按照大小分等级
  d3.rank([23, 2, -1, 4])
  [3,1,0,2]
 2. 如果有 null, undefined, nan ,'' 空值，全部归于NaN
 3. 可以自己给出访问方法或者比较器函数
  d3.rank([{x: 1}, {}, {x: 2}, {x: 0}], d => d.x)
  [1, NaN, 2, 0]

  d3.rank(["aa", "ba", "bc", "bb", "ca"], (a, b) => d3.ascending(a[0], b[0]) || d3.ascending(a[1], b[1])) //
  [0, 1, 3, 2, 4]

 4. 相等的值给相等的等级
 */

function least(values, compare = ascending) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const value of values) {
      const value = compare(element);
      if (
        defined ? ascending(value, minValue) < 0 : ascending(value, value) === 0
      ) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }
}

export default function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending; // 这个是没有给比较器的情况， compare1 用于判断查找的值是否不为NaN和null
    compare2 = (d, x) => ascending(f(d), x); // 默认值
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      // 如果 x 是 NaN,这类的，就直接返回最后一位不用比价
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1; // 取中位数
        if (compare2(a[mid], x) < 0)
          lo = mid + 1; // 如果x 比 mid大，就增加左边界
        else hi = mid; // 减小右边届
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0)
          lo = mid + 1; // 这里就是加了个=，即相等的情况也是加左边界
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  // 返回给定数字数组中最接近x的值的索引。参数lo（包括）和hi（排除）可用于指定应考虑的数组子集；默认情况下，将使用整个阵列。
  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1); // 找到最左边
    // 如 3.14  3 和 4  ，left结果会给出3
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return { left, center, right };
}

function zero() {
  return 0;
}
