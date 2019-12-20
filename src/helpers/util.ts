// 可以起到缓存的作用，避免每次调用去 Object 层面获取
const toString = Object.prototype.toString

// 我们需要确保返回的是期待的类型
// export function isDate (val: any): boolean {
//   return toString.call(val) === '[object Date]'
// }
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// if the val is a plain object
// FormDate will be form object
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
