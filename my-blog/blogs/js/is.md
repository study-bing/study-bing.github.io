---
title: 常用的判断方法
date: 2022-02-15
tags:
  - js基础
categories:
  - js
---

## 1.代码
```js
const toString = Object.prototype.toString

function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined'
}

function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val)
}

function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

function isNull(val: unknown): val is null {
    return val === null
}

function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val)
}

function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val)
}

function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

function isString(val: unknown): val is string {
    return is(val, 'String')
}

function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp')
}

function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window')
}

function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName
}

const isServer = typeof window === 'undefined'

const isClient = !isServer

/** url链接正则 */
function isUrl<T>(value: T): boolean {
    const reg =
        // eslint-disable-next-line no-useless-escape
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    // @ts-expect-error
    return reg.test(value)
}

/** 手机号码正则 */
function isPhone<T>(value: T): boolean {
    const reg =
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    // @ts-expect-error
    return reg.test(value)
}

/** 邮箱正则 */
function isEmail<T>(value: T): boolean {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    // @ts-expect-error
    return reg.test(value)
}

```
