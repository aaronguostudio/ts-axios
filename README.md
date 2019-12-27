# ts-axios

> Practice project, rewrite axios using typescript

## typescript-library-starter

- generate typescript library starter project
- integrated with:
  - rollup
  - prettier
  - typedoc
  - jest
  - commitizen
  - semantic release
  - husky
  - conventional changelog

## 关于 axios 的 interceptor

```js

// request, FILO
axios.interceptors.request.use(config => 「
  // 1
)

axios.interceptors.request.use(config => {
  // 2
})

// response, FIFO
axios.interceptors.response.use(res => {
  // 3
})

// remove
// axios.interceptors.request.eject(myInterceptor)

// 执行顺序
// 2 -> 1 -> send request -> 3 -> handle response

```
