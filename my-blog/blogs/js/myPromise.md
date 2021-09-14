---
title: 模拟promise
date: 2021-04-28
tags:
 - js
categories:
 - js
---
``` js
/*
 * @Description: 实现promise方法 链式方法
 */
// ! 1.then中的传递函数，判断成功和失败的返回结果
// ! 2.判断是不是promise，是则返回它的状态
// ! 3.不是promise则继续传递下去
// ? 自己调用自己，列如 let p2 = promise
// ?   .then(
// ?       (res) => {
// ?          return p2
// ?      },
// ?      (err) => {
// ?          console.log(err)
// ?      }
// ? )
// ?  等于自己等待自己完成，所以永远也不会执行下一步操作,状态一直在PENDING
// ?  普通的调用，在调用then时候生成的promise2的时候进入resolvePromise方法会得出下一步then是成功还是失败并且传递参数
const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(
            new TypeError("Chaining cycle detected for promise #<Promise>")
        )
    }
    if ((typeof x === "object" && x !== null) || typeof x === "function") {
        let called = false // 防止多次调用
        try {
            let then = x.then // 取then，then可能是defineProperty来定义
            if (typeof then === "function") {
                then.call(
                    x,
                    (y) => {
                        if (called) {
                            return
                        }
                        called = true
                        resolvePromise(promise2, y, resolve, reject) // y可能是promise，直到普通值为止
                    },
                    (r) => {
                        if (called) {
                            return
                        }
                        called = true
                        reject(r)
                    }
                )
            } else {
                if (called) {
                    return
                }
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) {
                return
            }
            called = true
            reject(error)
        }
    } else {
        resolve(x) // 成功直接返回
    }
}
function isPromise(val) {
    if (
        (typeof val === "object" && val !== null) ||
        typeof val === "function"
    ) {
        if (typeof val.then === "function") {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING // 初始状态值
        this.value = undefined // 成功值
        this.reason = undefined // 失败原因
        this.fulfillCallback = [] // 成功数组
        this.rejectCallback = [] // 失败数组
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.fulfillCallback.forEach((fn) => fn())
                // 发布
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.rejectCallback.forEach((fn) => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onfulfilled, onrejected) {
        onfulfilled =
            typeof onfulfilled === "function" ? onfulfilled : (data) => data
        onrejected =
            typeof onrejected === "function"
                ? onrejected
                : (error) => {
                      throw error
                  }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            } else {
                this.fulfillCallback.push(() => {
                    // 订阅
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.rejectCallback.push(() => {
                    // 订阅
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
    catch(fn) {
        return this.then(null, fn)
    }
    finally(fn) {
        return this.then(
            (value) => {
                return Promise.resolve(fn()).then(() => value)
            },
            (reason) => {
                return Promise.resolve(fn()).then(() => {
                    throw reason
                })
            }
        )
    }
    static all(promiseArray = []) {
        if (!Array.isArray(promiseArray)) {
            throw new TypeError("must be an array")
        }
        return new Promise((resolve, reject) => {
            let [arr, count] = [[], 0]
            function processData(val, i) {
                arr[i] = val
                count++
                if (count === promiseArray.length) {
                    resolve(arr)
                }
            }
            for (let index = 0; index < promiseArray.length; index++) {
                if (isPromise(promiseArray[index])) {
                    promiseArray[index].then((data) => {
                        processData(data, index)
                    }, reject)
                } else {
                    processData(promiseArray[index], index)
                }
            }
        })
    }
    static resolve(value) {
        // !重要 不判断会直接执行，抛出一个promise
        if (isPromise(value)) {
            return value
        }
        return new Promise((resolve) => {
            resolve(value)
        })
    }
    static reject(value) {
        // !重要 不判断会直接执行，抛出一个promise
        if (isPromise(value)) {
            return value
        }
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }
    static race(promiseArray = []) {
        if (!Array.isArray(promiseArray)) {
            throw new TypeError("must be an array")
        }
        let flag = true
        return new Promise((resolve, reject) => {
            promiseArray.forEach((pro) => {
                if (isPromise(pro)) {
                    pro.then(
                        (res) => {
                            if (flag) {
                                flag = false
                                resolve(res)
                            }
                        },
                        (err) => {
                            if (flag) {
                                flag = false
                                reject(err)
                            }
                        }
                    )
                } else {
                    if (flag) {
                        flag = false
                        resolve(pro)
                    }
                }
            })
        })
    }
}

Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise

```
