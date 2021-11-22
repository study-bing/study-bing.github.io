---
title: 原型链继承
date: 2021-10-26
tags:
 - js基础
categories:
 - js
---

## 1.原型链继承

```js
function Parent() {
    this.name = 'linbin'
}
Parent.prototype.getName = function() {
    console.log(this.name)
}
function Child() {}
Child.prototype = new Parent()
var child1 = new Child()
console.log(child1.getName()) // linbin
```

缺点：  
1.在创建 Child 的实例时，不能向 Parent 传参  
2.引用类型的属性被所有实例共享，举个例子：

```js
function Parent() {
    this.names = ['aaa', 'bbb']
}
function Child() {}
Child.prototype = new Parent()
var child1 = new Child()
child1.names.push('ccc')
console.log(child1.names) // ["aaa", "bbb", "ccc"]
var child2 = new Child()
console.log(child2.names) // ["aaa", "bbb", "ccc"]
```
## 2.借用构造函数(经典继承)

```js
function Parent() {
    this.names = ['aaa', 'bbb']
}
function Child() {
    Parent.call(this)
}
var child1 = new Child()
child1.names.push('ccc')
console.log(child1.names) // ["aaa", "bbb", "ccc"]
var child2 = new Child()
console.log(child2.names) // ["aaa", "bbb"]
```

优点：  
1.避免了引用类型的属性被所有实例共享  
2.可以在 Child 中向 Parent 传参  
```js
function Parent (name) {
    this.name = name;
}
function Child (name) {
    Parent.call(this, name);
}
var child1 = new Child('aaa');
console.log(child1.name); // aaa
var child2 = new Child('bbb');
console.log(child2.name); // bbb
```
缺点：  
方法都在构造函数中定义，每次创建实例都会创建一遍方法。

## 3.组合继承
融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
var child1 = new Child('aaa', '18');
child1.colors.push('black');
console.log(child1.name); // aaa
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]
var child2 = new Child('bbb', '20');
console.log(child2.name); // bbb
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```
## 4.原型式继承
原型链继承一样
```js
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
```js
var person = {
    name: 'aaa',
    friends: ['bbb', 'ccc']
}
var person1 = createObj(person);
var person2 = createObj(person);
person1.name = 'person1';
console.log(person2.name); // aaa
person1.friends.push('ddd');
console.log(person2.friends); // ["bbb", "ccc", "ddd"]
```

## 5.寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
```js
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

## 6.寄生组合式继承
```js
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();

var child1 = new Child('aaa', '18');
console.log(child1);
```
封装
```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child; //很重要
    child.prototype = prototype; // 很重要
}

// 当我们使用的时候：
prototype(Child, Parent);
```
这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
>参考资料<https://github.com/mqyqingfeng/Blog/issues/16>

# 7.Class继承
Class 可以通过extends关键字实现继承
```js
class Point {
}

class ColorPoint extends Point {
}
```
1.ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this    

2.子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象
```js
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

>参考资料<https://es6.ruanyifeng.com/#docs/class-extends>