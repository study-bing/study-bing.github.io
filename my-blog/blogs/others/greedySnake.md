---
title: 贪吃蛇
date: 2021-11-15
tags:
 - 其他
categories:
 - js
---
## 1.贪吃蛇介绍
儿时的贪吃蛇游戏，上下左右控制，吃到蛇会变长并且加速

## 2.思路
分为地图、食物、蛇、游戏四个类  
地图类可以添加并渲染数据，清楚数据  
食物可以随机创建一个点  
蛇可以吃食物并且上下左右走动  
游戏记录分数并显示

## 3.代码
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>贪吃蛇</title>
		<style>
			#map {
				width: 400px;
				height: 400px;
				background: #000;
				position: relative;
			}
		</style>
	</head>
	<body>
		<div id="count"></div>
		<div id="map"></div>
		<script>
			class Map {
				constructor(el, rect = 10) {
					this.el = el
					this.rect = rect
					// 获取格子数
					this.rows = Math.ceil(Map.getStyle(el, 'height') / rect)
					this.cells = Math.ceil(Map.getStyle(el, 'width') / rect)
					// 重置宽高
					Map.setStyle(el, 'height', this.rows * rect + 'px')
					Map.setStyle(el, 'width', this.cells * rect + 'px')
					// 数据
					this.data = [] // {x: 0, y: 0, color: #fff}
				}
				static getStyle(el, attr) {
					return parseFloat(getComputedStyle(el)[attr])
				}
				static setStyle(el, attr, val) {
					el.style[attr] = val
				}
				// 获取新数据
				setData(data) {
					this.data = this.data.concat(data)
				}
				// 清空数据
				clearData() {
					this.data.length = 0
				}
				// 渲染点
				render() {
					this.el.innerHTML = this.data
						.map(el => {
							return `<span style="position:absolute;left:${this.rect * el.x}px;top:${this.rect * el.y}px;width:${this.rect}px;height:${this.rect}px;background-color:${
								el.color
							}"></span>`
						})
						.join('')
				}
			}
			class Food {
				constructor(rows, cells) {
					this.color = ['blue', 'red', 'grey', 'orange', 'pink']
					this.rows = rows
					this.cells = cells
					this.data = {}
					this.create()
				}
				create() {
                    // 创建随机的点
					this.data = {
						x: Math.floor(Math.random() * this.cells),
						y: Math.floor(Math.random() * this.rows),
						color: this.color[Math.floor(Math.random() * this.color.length)]
					}
				}
			}
			class Snake {
				constructor() {
					this.data = [
						{ x: 10, y: 10, color: 'yellow' },
						{ x: 9, y: 10, color: '#eeeeee' },
						{ x: 8, y: 10, color: '#eeeeee' },
						{ x: 7, y: 10, color: '#eeeeee' },
						{ x: 6, y: 10, color: '#eeeeee' },
						{ x: 5, y: 10, color: '#eeeeee' }
					]
					this.directive = 'right'
					this.lastData = {}
					this.move()
				}
				move() {
					let lastIndex = this.data.length - 1
                    // 记录最后的点，当蛇吃到的食物加入data让蛇变长
					this.lastData = {
						x: this.data[lastIndex].x,
						y: this.data[lastIndex].y,
						color: this.data[lastIndex].color
					}
                    // 每次移动都是前面的点走到之前的位置
					for (let index = this.data.length - 1; index > 0; index--) {
						this.data[index].x = this.data[index - 1].x
						this.data[index].y = this.data[index - 1].y
					}
					switch (this.directive) {
						case 'right':
							this.data[0].x++
							break
						case 'left':
							this.data[0].x--
							break
						case 'top':
							this.data[0].y--
							break
						case 'bottom':
							this.data[0].y++
							break
						default:
							break
					}
				}
				changeDir(dir) {
                    // 左右移动的时候判断左右键盘无效，上下移动的时候判断上下键盘无效
					return (['left', 'right'].includes(this.directive) && ['left', 'right'].includes(dir)) || (['top', 'bottom'].includes(this.directive) && ['top', 'bottom'].includes(dir))
				}
				eatFood() {
					this.data.push(this.lastData)
				}
				include({ x, y }) {
					return (
						this.data.findIndex(el => {
							return el.x === x && el.y === y
						}) > -1
					)
				}
			}
			class Game {
				constructor(map, rect = 10) {
					this.node = document.querySelector('#count')
					this.map = new Map(map, rect)
					this.food = new Food(this.map.rows, this.map.cells)
					this.snake = new Snake()
					this.timer = null
					this.interval = 200
					this.count = 0
					this.keyDown = this.keyDown.bind(this)
					this.map.render()
				}
				start() {
					this.count = 0
					this.countShow()
					this.food.create()
					this.move()
					this.control()
				}
				stop() {
					clearInterval(this.timer)
				}
				countShow() {
					this.node.innerHTML = this.count
				}
				foodDataCreate() {
                    // 创建的食物不能在蛇的身上，不然重新创建
					if (this.snake.include(this.food.data)) {
						this.food.create()
					}
				}
				move() {
					this.stop()
					this.timer = setInterval(() => {
						this.snake.move()
						this.map.clearData()
                        // 如果吃了
						if (this.isEat()) {
							this.snake.eatFood()
							this.food.create()
							this.count++
							this.countShow()
                            // 加速
							this.interval = this.interval * 0.9
							this.move()
						}
                        // 游戏结束
						if (this.isOver()) {
							this.count = 0
							this.countShow()
							this.stop()
							return
						}
						this.foodDataCreate()
						this.map.setData(this.food.data)
						this.map.setData(this.snake.data)
						this.map.render()
					}, this.interval)
				}
				isEat() {
					return this.snake.data[0].x === this.food.data.x && this.snake.data[0].y === this.food.data.y
				}
				isOver() {
					if (this.snake.data[0].x < 0 || this.snake.data[0].x >= this.map.cells || this.snake.data[0].y < 0 || this.snake.data[0].y >= this.map.rows) {
						return true
					}
					for (let index = 1; index < this.snake.data.length; index++) {
						const element = this.snake.data[index]
						if (this.snake.data[0].x === element.x && this.snake.data[0].y === element.y) {
							return true
						}
					}
				}
				control() {
					window.addEventListener('keydown', this.keyDown)
				}
				keyDown({ keyCode }) {
					let directive = ''
					switch (keyCode) {
						case 37:
							directive = 'left'
							break
						case 38:
							directive = 'top'
							break
						case 39:
							directive = 'right'
							break
						case 40:
							directive = 'bottom'
							break
						default:
							break
					}
					if (this.snake.changeDir(directive)) {
						return false
					}
					this.snake.directive = directive
				}
			}
			let map = document.querySelector('#map')
			let game = new Game(map, 10)
			game.start()
		</script>
	</body>
</html>
```