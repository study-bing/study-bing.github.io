---
title: 链式调用
date: 2021-10-31
tags:
 - js
categories:
 - js
---
## 1.链式调用
我们经常看见一些函数调用完后继续调用其他函数，比如：people.run().sing().stopSing().stopRun();这就是所谓的链式调用

一般的函数调用和链式调用的区别：链式调用完方法后，return this返回当前调用方法的对象

## 2.链式调用同步执行
因为链式调用中函数为异步，则无法判断他的先后顺序，所以我们将链式调用变成同步

思路：使用队列的先进先出思想
```js
function Test(name) {
    this.queue = []
    // 创建时想执行的函数可以先加入
    let fn = () => {
        this.next()
    }
    this.queue.push(fn)
    // 异步使用，让后面的函数先加入队列
    setTimeout(() => {
        this.next()
    }, 0)
    return this
}
// 在所有函数执行之前执行
Test.prototype.firstSleep = function (timer) {
    console.time("firstSleep")
    let that = this
    let fn = () => {
        setTimeout(() => {
            console.timeEnd("firstSleep")
            that.next()
        }, timer * 1000)
    }
    this.queue.unshift(fn)
    return this
}
// 异步函数
Test.prototype.sleep = function (timer) {
    console.time("sleep")
    let that = this
    let fn = () => {
        setTimeout(() => {
            console.timeEnd("sleep")
            that.next()
        }, timer * 1000)
    }
    this.queue.push(fn)
    return this
}
// 同步函数
Test.prototype.eat = function (dinner) {
    let that = this
    let fn = () => {
        console.log(dinner)
        that.next()
    }
    this.queue.push(fn)
    return this
}
// 执行函数
Test.prototype.next = function (dinner) {
    let fn = this.queue.shift()
    fn && fn()
}
// 测试代码
new Test("test").firstSleep(3).sleep(1).eat("dinner")
```