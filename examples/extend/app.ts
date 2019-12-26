import axios, { AxiosError } from '../../src/index'

axios({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
})


axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
})

axios.get('/extend/get')
axios.delete('/extend/delete')
axios.options('/extend/options')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

interface ResponseData<T = any> {
  code: number
  message: string
  result: T
}

interface User {
  name: string
  age: number
}

function getuser<T> () {
  return axios<ResponseData<T>>('/extend/user', {})
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function testGetUser () {
  const user = await getuser<User>()
  if (user) {
    console.log('>', user.result.name)
  }
}

testGetUser()
