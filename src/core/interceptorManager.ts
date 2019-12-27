import { resolvedFn, rejectedFn, AxiosInterceptorManager } from '../types'

interface Interceptor<T> {
  resolved: resolvedFn<T>
  rejected?: rejectedFn
}

export default class IntercepterManager<T> implements AxiosInterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null> // or Interceptor<T>[]

  constructor() {
    this.interceptors = []
  }

  use(resolved: resolvedFn<T>, rejected?: rejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
