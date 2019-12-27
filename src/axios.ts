import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

// 这个工厂函数帮助扩展了 Axios 类，实现了可以通过 axios(config) 的方式调用
// 参考: https://coding.imooc.com/lesson/330.html#mid=24631 - 7:30
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  // 这个 instance 是一个指向 Axios.prototype.request 的函数
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
