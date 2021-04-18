/**
 * Swiper 0.1.2
 * https://github.com/wclimb/Swipe
 * Copyright 2018 wclimb
 * Released under the MIT License
 * 2018-06-28
 */
(function (window) {
    'use strict';
    var pagination, // 分页
        autoplay, // 自动轮播
        navigation, // 前进后退
        main, // 主要区域
        wrap = document.querySelector('.swipe-wrap'),
        clientWidth = wrap.offsetWidth,
        start = 0, // 开始
        scroll = 0, // 滚动的距离，累加
        end = -clientWidth, // 初始化结束位置
        index = 1, // 下标
        turnLR = 0, // 滑动的距离
        allImg = null, // 全部图片集合
        autoTimer = null, // 自动轮播定时器
        totalLength = 0, // 图片总的length
        transitionEnd = null, // 运动结束执行函数
        speed = 300, // 过渡时间
        startSlide = 1;

    var Swipe = function (el, options) {
        pagination = options.pagination || ''
        autoplay = options.autoplay || ''
        navigation = options.navigation || null
        transitionEnd = options.transitionEnd || null
        speed = options.speed || 300
        index = startSlide = options.startSlide || 1; // 初始化开始位置
        start = end = startSlide * -clientWidth;

        main = document.querySelector(el);
        allImg = wrap.querySelectorAll('.swipe-slide')
        var firstELe = allImg[0].cloneNode(true); // 克隆第一个元素
        var lastELe = allImg[allImg.length - 1].cloneNode(true); // 克隆最后一个元素
        wrap.appendChild(firstELe);
        wrap.insertBefore(lastELe, allImg[0]);
        totalLength = wrap.querySelectorAll('.swipe-slide').length;
        if (autoplay) {
            this.autoSlide()
        }
        this.realIndex = 0
        var that = this
        // 分页
        if (pagination.el) {
            var paginationEl = document.querySelector(pagination.el);
            for (var i = 0; i < totalLength - 2; i++) {
                var ele = document.createElement('div');
                if (i == index - 1) {
                    ele.className = 'swipe-pagination-list swipe-pagination-active'
                } else {
                    ele.className = 'swipe-pagination-list '
                }
                if (pagination.clickAble) {
                    (function (i) {
                        if ('ontouchstart' in window) {
                            ele.addEventListener('touchstart', that.paginationClick.bind(that, i), false)
                        } else {
                            ele.addEventListener('click', that.paginationClick.bind(that, i), false)
                        }
                    })(i)
                }
                paginationEl.appendChild(ele)
            }
        }
        var initFn = this.init.bind(this, options)
        window.addEventListener('DOMContentLoaded', this.throttle(initFn,100), false)
        window.addEventListener('resize', this.throttle(initFn,100), false)

        if ('ontouchstart' in window) {
            main.addEventListener('touchstart', this.mousedown.bind(this), false)
            main.addEventListener('touchmove', this.mousemove.bind(this), false)
            main.addEventListener('touchend', this.mouseup.bind(this), false)
        } else {
            main.addEventListener('mousedown', that.mousedown.bind(that), false)
        }
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible' && autoplay) {
                clearTimeout(autoTimer)
                that.autoSlide()
            }else{
                clearTimeout(autoTimer)
            }
        })
        // 前进后退
        if (!navigation) return
        var next = navigation.next,
            prev = navigation.prev,
            prevEl = document.querySelector(prev) || null,
            nextEl = document.querySelector(next) || null;
        if (prevEl && nextEl) {
            if ('ontouchstart' in window) {
                prevEl.addEventListener('touchstart', that.throttle(that.prev.bind(that)), false)
                nextEl.addEventListener('touchstart', that.throttle(that.next.bind(that)), false)
            } else {
                prevEl.addEventListener('click', that.throttle(that.prev.bind(that)), false)
                nextEl.addEventListener('click', that.throttle(that.next.bind(that)), false)
            }
        }
    }
    Swipe.prototype.init = function (options) {
        console.log(11)
        clientWidth = wrap.offsetWidth
        end = -clientWidth
        index = startSlide = options.startSlide || 1; // 初始化开始位置
        start = end = startSlide * -clientWidth;
        scroll = 0;
        var nowAllImg = wrap.querySelectorAll('.swipe-slide');
        nowAllImg.forEach(function (val, i) {
            val.setAttribute('data-index', i);
            val.style.width = clientWidth + 'px'
        })
        this.setStyle(end, false)
        this.setPagination()
    }
    // 分页按钮点击
    Swipe.prototype.paginationClick = function (i, e) {
        if (i + 1 === index) return
        clearTimeout(autoTimer)
        if (autoTimer) {
            this.autoSlide()
        }
        end = start = -clientWidth * (i + 1);
        index = i + 1;
        this.setPagination()
        this.setStyle(-clientWidth * (i + 1), true)
        wrap.removeEventListener('transitionend', this.transitionEnd, false)
        wrap.removeEventListener('webkitTransitionEnd', this.transitionEnd, false)
        this.setTransitionEnd()
    }
    Swipe.prototype.prev = function () {
        var that = this
        clearTimeout(autoTimer)
        if (autoTimer) {
            that.autoSlide()
        }
        index--
        that.setPagination()
        if (index === 0) {
            that.setStyle(-clientWidth * index, true)
        } else {
            that.setStyle(-clientWidth * index, true)
        }
        start = end = -clientWidth * index
        wrap.removeEventListener('transitionend', this.transitionEnd, false)
        wrap.removeEventListener('webkitTransitionEnd', this.transitionEnd, false)
        this.setTransitionEnd()
    }
    Swipe.prototype.next = function (e) {
        var that = this
        clearTimeout(autoTimer)
        if (autoTimer) {
            that.autoSlide()
        }
        index++
        if (index === totalLength - 1) {
            that.setStyle(-clientWidth * index, true)
        } else {
            that.setStyle(-clientWidth * index, true)
        }
        that.setPagination()
        start = end = -clientWidth * index;
        wrap.removeEventListener('transitionend', this.transitionEnd, false)
        wrap.removeEventListener('webkitTransitionEnd', this.transitionEnd, false)
        this.setTransitionEnd()
    }
    // 执行动画
    Swipe.prototype.setStyle = function (scroll, isMove, cb) {
        wrap.style.transform = 'translate3d(' + scroll + 'px,0,0)';
        wrap.style.webkitTransform = 'translate3d(' + scroll + 'px,0,0)';
        if (isMove) {
            wrap.style.transitionDuration = speed + 'ms';
            wrap.style.webkitTransitionDuration = speed + 'ms';
            cb && cb()
        } else {
            wrap.style.transitionDuration = '0ms';
            wrap.style.webkitTransitionDuration = '0ms';
        }
        // realIndex设置
        if (index === 0) {
            this.realIndex = totalLength - 3
        } else {
            this.realIndex = index - 1
        }
        if (index === 5) {
            this.realIndex = 0
        } else {
            this.realIndex = index - 1
        }

    }
    // 鼠标/手指按下
    Swipe.prototype.mousedown = function (e) {
        var targrtClsName = e.target.className
        if (targrtClsName.indexOf('swipe-btn-next') >= 0 || targrtClsName.indexOf('swipe-btn-prev') >= 0 ) return
        clearTimeout(autoTimer)
        e.preventDefault()
        // 按下的开始位置
        start = e.touches ? e.touches[0].pageX : e.pageX
        if (index === 0) {
            index = totalLength - 2;
            end = -clientWidth * index
            this.setStyle(-clientWidth * index, false)
        }
        if (index === totalLength - 1) {
            index = 1
            end = -clientWidth * index
            this.setStyle(-clientWidth * index, false)
        }
        if ('onmousemove' in window) {
            this.mousemove = this.mousemove.bind(this)
            this.mouseup = this.mouseup.bind(this)
            document.addEventListener('mousemove', this.mousemove, false)
            document.addEventListener('mouseup', this.mouseup, false)
        }
    }
    // 鼠标/手指移动
    Swipe.prototype.mousemove = function (e) {
        e.preventDefault()
        var targrtClsName = e.target.className
        if (targrtClsName.indexOf('swipe-btn-next') >= 0 || targrtClsName.indexOf('swipe-btn-prev') >= 0 ) return
        clearTimeout(autoTimer)
        // 滑动实时更新的位置
        var offsetX = e.touches ? e.touches[0].pageX : e.pageX ;
        scroll = (offsetX) - start + end
        turnLR = offsetX - start
        this.throttle(this.setStyle(Math.ceil(scroll), false),100)
    }
    // 鼠标/手指抬起
    Swipe.prototype.mouseup = function (e) {
        e.preventDefault()
        var targrtClsName = e.target.className
        if (targrtClsName.indexOf('swipe-btn-next') >= 0 || targrtClsName.indexOf('swipe-btn-prev') >= 0 ) return
        clearTimeout(autoTimer)
        if (autoTimer) {
            this.autoSlide()
        }
        var offsetX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        if (start === offsetX) {
            // 移除滑动和抬起时间
            document.removeEventListener('mousemove', this.mousemove, false)
            document.removeEventListener('mouseup', this.mouseup, false)
            return
        }
        if (turnLR < 0) {
            if (Math.abs(turnLR) > 50) {
                index++
                this.setStyle(-clientWidth * index, true)
            } else {
                this.setStyle(-clientWidth * index, true)
            }
            end = -clientWidth * index
        } else if (turnLR > 0) {
            if (Math.abs(turnLR) > 50) {
                index--
                this.setStyle(-clientWidth * index, true)
            } else {
                this.setStyle(-clientWidth * index, true)
            }
            end = -clientWidth * index
        }

        if (pagination) {
            this.setPagination()
        }
        wrap.removeEventListener('transitionend', this.transitionEnd, false)
        wrap.removeEventListener('webkitTransitionEnd', this.transitionEnd, false)
        this.setTransitionEnd()

        // 移除滑动和抬起时间
        document.removeEventListener('mousemove', this.mousemove, false)
        document.removeEventListener('mouseup', this.mouseup, false)
    }
    Swipe.prototype.setTransitionEnd = function () {
        // 监听滚动结束
        this.transitionEnd = this.transitionEnd.bind(this)
        wrap.addEventListener('transitionend', this.transitionEnd, false)
        wrap.addEventListener('webkitTransitionEnd', this.transitionEnd, false)

    }
    // 运动结束
    Swipe.prototype.transitionEnd = function () {
        if (index === 0) {
            index = totalLength - 2
            end = -clientWidth * index
            this.setStyle(-clientWidth * index, false)
        }
        if (index === totalLength - 1) {
            index = 1
            end = -clientWidth * index
            this.setStyle(-clientWidth * index, false)
        }
        var nowAllImg = wrap.querySelectorAll('.swipe-slide');
        nowAllImg.forEach(function(val,i) {
            var cls = val.className
            if (cls.indexOf('swipe-slide-active') >= 0){
                val.className = cls.replace('swipe-slide-active', '').replace(/^\s+|\s+$/g,'')
            }
            if(i === index){
                var clsArr = cls.split(/\s+/)
                clsArr.push('swipe-slide-active')
                val.className = clsArr.join(' ')
            }
        })
        if (transitionEnd) {
            typeof transitionEnd === 'function' && transitionEnd(this);
        }
        wrap.removeEventListener('transitionend', this.transitionEnd, false)
        wrap.removeEventListener('webkitTransitionEnd', this.transitionEnd, false)
    }
    // 设置分页
    Swipe.prototype.setPagination = function () {
        if (!pagination) return
        var num = index
        if (num === totalLength - 1) {
            num = 1
        }
        if (num === 0) {
            num = totalLength - 2
        }
        
        var list = document.querySelectorAll('.swipe-pagination-list');
        list.forEach(function (val, i) {
            var cls = val.className
            val.className = cls.replace('swipe-pagination-active', '').replace(/^\s+|\s+$/g, '')
        })
        var cls = list[num - 1].className;
        var clsArr = cls.split(/\s+/)
        clsArr.push('swipe-pagination-active')
        list[num - 1].className = clsArr.join(' ')

    }
    // 节流
    Swipe.prototype.throttle = function (fn, interval) {
        var timer,
            isFirst = true;
        return function () {
            var args = arguments,
                that = this
            if (isFirst) {
                fn.apply(that, args)
                return isFirst = false
            }
            if (timer) {
                return
            }
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
                fn.apply(that, args)
            }, interval || speed + 50);
        }
    }
    // 自动轮播
    Swipe.prototype.autoSlide = function() {
        var that = this
        autoTimer = setTimeout(function () {
            that.next()
        }, autoplay)
    }
    window.Swipe = Swipe
})(window)