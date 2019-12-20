import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'bar']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'bar'
    }
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$ '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'foo',
    bar: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'foo',
    bar: null
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'foo',
    bar: 'bar'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  method: 'post',
  url: '/base/buffer',
  data: new Int32Array([21, 31])
})
