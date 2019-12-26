import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// 这个工厂函数帮助扩展了 Axios 类，实现了可以通过 axios(config) 的方式调用
// 参考: https://coding.imooc.com/lesson/330.html#mid=24631 - 7:30
function createInstance(): AxiosInstance {
  const context = new Axios()

  // 这个 instance 是一个指向 Axios.prototype.request 的函数
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
