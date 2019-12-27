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

// 混合类型
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
