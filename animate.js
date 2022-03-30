/**
 * 封装一个动画插件
 */

// 验证当前运行环境下有没有插件库
if(!this.myPlugin){
    this.myPlugin = {}
}
this.myPlugin.Animate = function(option){
    console.log('create animate obj');
    console.log(option);
    // 初始化默认配置项
    var defaultOption = {
        duration: 16, //默认间隔时间，单位毫秒
        total: 1000, //默认总时间
        begin: {}, //初始值
        end: {} //终止值
    }

    // 将默认参数与option 合并处理
    option = myPlugin.mixin(defaultOption,option);
    console.log(option);
    // 因为配置参数属于动画中一部分；所以应该将配置参数挂在到实例对象上
    this.option = option;

    // 记录定时器
    this.timer = null;
    // 记录当前动画执行的次数
    this.currentNum = 0;

    this.currentData = myPlugin.deepCopy(this.option.begin);

    // 求运动元素总执行次数
    this.num = Math.ceil(this.option.total / this.option.duration)

    // 求所有属性 运行的总距离
    this.distant = {}
    // 求每个属性运行的平均值
    this.everyDistant = {}
    for(let prop in this.option.begin){
        this.distant[prop] = this.option.end[prop]  - this.option.begin[prop];
        this.everyDistant[prop] = this.distant[prop]  / this.num
    }

}

// this.myPlugin.Animate.prototype.flag = true;

/**
 * 开始执行动画
 * 注意: 这里不处理具体是哪个dom实现动画。
 *      处理动画变化的每一帧数据
 */
this.myPlugin.Animate.prototype.start = function(){
    // 找到动画禁止执行的条件？,在动画执行中禁止触发setTerval
    // if(!this.flag){
    //     return
    // }
    // this.flag = false;

    // 如果之前已经存在计时器，则不做任何处理
    if(this.timer || this.currentNum === this.num){
        return
    }

    //*** 1：刚开始执行动画，添加【动画开始事件】
    if(typeof this.option.onstart  === 'function'){
        this.option.target = this;
        // 监听动画开始的行为
        this.option.onstart.bind(this)(this.option)
    }
    
    // 为了保证回调函数中可以获取实例对象
    var this_ = this;

    this.timer = setInterval(function(){
        // 注意：这里的this是window
        // console.log(this_);
        this_.currentNum++;

        for(let prop in this_.option.begin){
            // currentData 记录每个运动属性值，变化的每一帧。
            // this_.currentData[prop] = this_.currentData[prop] + this_.everyDistant[prop]

            // 解决最后一次动画赋值问题
            if(this_.currentNum === this_.num){
                this_.currentData[prop] = this_.option.end[prop]
            }else{
                // 不是最后一次
                this_.currentData[prop] += this_.everyDistant[prop];
            }

            // 弊端
            // 1: 更改了数据源的变化
            // 2：验证css中哪些属性需要加px 哪些不需要加 px 
            // 3：css 属性数据量大，运算量大
            // this_.option.begin[prop] = this_.option.begin[prop] + this_.option.everyDistant[prop]
            // this_.option.el.style[prop] = this_.option.begin[prop];
        }


        //*** 动画进行中  添加【动画执行事件】
        if(typeof this_.option.onmove  === 'function'){
            // 监听动画的每一帧
            this_.option.onmove.bind(this_)(this_)
        }

        if(this_.currentNum === this_.num){
            //*** 添加【动画结束事件】
            this_.stop();
            // 作用监听动画是否结束
            if(typeof this_.option.onover  === 'function'){
                this_.option.onover.bind(this_)()
            }
        }

    },this.option.duration)

}

/**
 * 动画停止执行
 */
this.myPlugin.Animate.prototype.stop = function(){
    console.log('stop run');
    console.log(this.option);
    clearInterval(this.timer);
    // 清空计时器，表示不存在计时器。更新tmer值
    this.timer = null;
}

/***
 * 1: 整个动画希望通过一个animate实例对象完成
 * -----> 构造函数创建实例对象
 * 2：完成动画需要哪些内容
 * ---> 2.1 每一帧的时间间隔  2.2 动画总时长  2.2 动画开始前属性 2.4 动画结束属性
 * 3：完成动画有哪些动作（函数）
 * ---> 3.1 开始执行 start()
 * ---->3.2 结束执行 stop()
 * 
 * 4：怎么监听动画全部过程
 *   开始   onstart
 *   进行中  onmove
 *   结束   onover
 * ---->通过添加事件方式
 */