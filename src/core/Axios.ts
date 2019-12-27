import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  resolvedFn,
  rejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import IntercepterManager from './interceptorManager'

interface interceptors {
  request: IntercepterManager<AxiosRequestConfig>
  response: IntercepterManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: resolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: rejectedFn
}

export default class Axios {
  interceptors: interceptors

  constructor() {
    this.interceptors = {
      request: new IntercepterManager<AxiosRequestConfig>(),
      response: new IntercepterManager<AxiosResponse>()
    }
  }

  // ts 的重载, 接口依然使用 config: AxiosRequestConfig
  // 这样做的原因是：推荐定义的接口，但是兼容其他的用法，也可以
  // 考虑这是为了实现旧版本的兼容
  request(url?: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 初始化调用链，这里初始化的就是实际的请求
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
