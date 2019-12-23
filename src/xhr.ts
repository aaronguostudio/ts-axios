import { AxiosRequestConfig, AxiosPromise } from './types'
import { resolve } from 'dns'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLowerCase(), url, true)

    request.onreadystatechange = () => {
      // if (request.readyState !== 4) {
      //   return
      // }
      // const responseHeaders = request.getAllResponseHeaders()
      // const responseData = responseType !== 'text' request.response : request.responseText
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
