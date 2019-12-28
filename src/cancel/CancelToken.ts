import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

// Cancel 是类，类既可以当做对象，也可当做类型
interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
