import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { data, url, method = 'get', headers } = config
  console.log('>data', data)
  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
    request.setRequestHeader(name, headers[name])
  })
  request.send(data)
}
