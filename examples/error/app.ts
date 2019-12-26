import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log('> res', res)
}).catch(e => {
  console.log('> error', e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log('> res', res)
}).catch(e => {
  console.log('> error', e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log('> res', res)
  }).catch(e => {
    console.log('> error', e)
  })
}, 5000) // timeout for turn off online when do testing

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('> res', res)
}).catch((e: AxiosError) => {
  console.log('> error', e.message)
  console.log('> error', e.code)
  console.log('> error', e.request)
  console.log('> error', e.config)
})

