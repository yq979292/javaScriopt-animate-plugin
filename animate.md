# js动画插件

## 下载安装

[githhub地址](https://github.com/yq979292/javaScriopt-animate-plugin/blob/main/animate.js)

## 快速度上手

~~~js
var div = document.querySelector('div')
var animate = new myPlugin.Animate({
    begin:{
        width:100
    },
    end:{
        widht:500
    },
    onmove:function(e){
        div.style.width = e.currentData.width + 'px'
    }
})

animate.start()
~~~

## api

|  api  | 作用|
| ---- | ---- |
|Animate|构造函数创建实例对象---|
| ----- | ---- |
|Animate.prototype.start|开始执行动画|
| Animate.prototype.stop |  停止执行动画 |
#### Animate

>创建动画实例对象

##### Option参数

| 参数 option/object | 描述               | 类型     |
| ------------------ | ------------------ | -------- |
| Duration           | 梅桢的时间间隔     | number   |
| Total              | 动画执行总时长     | Number   |
| begin              | 动画开始前样式     | Object   |
| end                | 动画结束样式       | object   |
| Onstart            | 动画开始钩子函数   | Function |
| Onmove             | 动画进行整钩子函数 | Function |
| Onover             | 动画结束钩子函数   | Function |



~~~js
var animate = myPlugin.Animate({
  
})
~~~



#### start

>开始执行动画



~~~js
ani.start()
~~~



- 无参数
- 无返回值

#### stop

>停止执行动画

~~~
ani.stop
~~~

- 无参数
- 无范沪指

## 事件

| 事件名  | 描述                        |
| ------- | --------------------------- |
| Onstart | 动画开始时候触发时间        |
| Onmove  | 动画进行中， 监听动画每一帧 |
| Onover  | 动画结束时候触发事件        |

#### onstart

>动画开始的时间处理函数

##### 参数


| Option       | Animate配置参数                  | object |
| ------------ | -------------------------------- | ------ |
| Num          | 动画执行总次数                   | Number |
| currentData  | 监听所有属性，每一帧变化的值     | Object |
| currentNum   | 当前执行到第几贞                 | Number |
| distant      | 所有属性运行总位置               | Object |
| everyDistant | 所有属性中每个属性运行的的平均值 | object |





#### onmove
> 监听动画每一帧的运动
##### 参数


| Option       | Animate配置参数                  | object |
| ------------ | -------------------------------- | ------ |
| Num          | 动画执行总次数                   | Number |
| currentData  | 监听所有属性，每一帧变化的值     | Object |
| currentNum   | 当前执行到第几贞                 | Number |
| distant      | 所有属性运行总位置               | Object |
| everyDistant | 所有属性中每个属性运行的的平均值 | object |




#### onover
>监听动画结束时间
##### 参数


| Option       | Animate配置参数                  | object |
| ------------ | -------------------------------- | ------ |
| Num          | 动画执行总次数                   | Number |
| currentData  | 监听所有属性，每一帧变化的值     | Object |
| currentNum   | 当前执行到第几贞                 | Number |
| distant      | 所有属性运行总位置               | Object |
| everyDistant | 所有属性中每个属性运行的的平均值 | object |


