(function() {
    'use strict';

    const ready = callback => {
        // HTML5的就绪事件
        document.addEventListener('DOMContentLoaded', function fn() {
            document.removeEventListener('DOMContentLoaded', fn); // 就绪事件只需要执行一次，所以执行就删除
            callback();
        });
    }

    const init = (selector, context) => {
        if (typeof selector === 'function') { // 如果参数是函数 
            // 参数为就绪函数
            ready(selector);
            return; //结束函数执行
        }
        return new Base(selector, context);
    }

    init.each = (obj, callback) => {
        // 用于遍历对象
        for (var key in obj) {
            callback(key, obj[key]);
        }
    }


    window.$ = init;



    class Base {
        constructor(selector, context) {
            // 参数selector 不一定是选择器
            // 判断它是否是DOM对象  如果是DOM对象 我们就将这个DOM对象封装进构造函数
            let elms;
            if (selector.nodeType === 1) { // 判断第一个参数是不是DOM元素
                this[0] = selector;
                Object.defineProperty(this, 'length', { value: 1 });
            } else {
                // node.querySelectorAll()
                elms = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector); //选择元素
                Object.assign(this, elms); //合并属性
                Object.defineProperty(this, 'length', {
                    value: elms.length
                }); //设置不可枚举属性 length
            }

        }

        each(callback) {
            // 遍历被选取元素
            for (let i = 0; i < this.length; i++) {
                callback(this[i], i);
            }
        }

        on(type, callback) {
            if (typeof type === 'string' && typeof callback === 'function') { // 判断参数是字符串 并且第二个参数是函数
                this.each(function(elm, i) { // 遍历所有被选择到的元素
                    elm.addEventListener(type, callback); // 为被选中元素添加事件
                });
            } else if (typeof type === 'object' && type != null) {
                this.each(function(elm, i) {
                    init.each(type, function(key, value) {
                        elm.addEventListener(key, value);
                    });
                });
            }
        }

        css(style, value) {
            let styleStr = '';
            if (typeof style === 'string' && typeof value === 'string') {
                this.each(function(elm) {
                    elm.style = `${elm.style.cssText};${style}:${value}`;
                });
            } else if (typeof style === 'object' && style != null) { // 判断数据类型是否是对象
                init.each(style, function(key, value) { // 多个样式 进行遍历 
                    styleStr += `${key}:${value};`; // 拼接样式字符串
                });
                this.each(function(elm) { // 遍历每一个元素 
                    elm.style = `${elm.style.cssText};${styleStr}`; // 为每一个元素添加行内样式
                });
            }
            return this;
        }

        addClass(className) { // 添加类名
            this.each(function(elm) {
                elm.classList.add(className);
            });
            return this;
        }


        removeClass(className) {
            this.each(function(elm) {
                elm.classList.remove(className);
            });
            return this;
        }


        index(elm) {
            // index函数 
            // 接收一个DOM元素作为参数
            // 在被选元素中匹配传入的DOM元素
            // 如果元素存在则返回索引
            // 如果不存在 则返回-1
            let arr = Array.from(this);
            return arr.findIndex(val => val == elm);
        }

        tabs(options) {
            let defaults = { // 默认参数
                ev: 'click',
                active: 'actived',
                display: 'show'
            }
            Object.assign(defaults, options); // 合并对象

            // 元素选择
            let btn = $('#' + this[0].id + '>ul>li', this[0]);
            let div = $('#' + this[0].id + '>div[data-type="tabs"]', this[0]);

            btn.on(defaults.ev, function() {
                // 获取事件触发元素在btn中的索引
                let _index = btn.index(this);

                btn.removeClass(defaults.active);
                $(this).addClass(defaults.active);

                div.removeClass(defaults.display);
                $(div[_index]).addClass(defaults.display);
            });
        }

        /**
         * 
         * @param {string|function} htmlText
         */
        html(htmlText) {
            if (typeof htmlText === 'undefined') {
                // 如果没有传参数  就返回 被选元素第一个的HTML文本
                return this[0].innerHTML;
            } else if (typeof htmlText === 'string') {
                // 如果参数是字符串
                // 将所有被选元素的html内容进行修改
                this.each(function(elm) {
                    elm.innerHTML = htmlText;
                });
            } else if (typeof htmlText === 'function') {
                this.each(function(elm, i) {
                    elm.innerHTML = htmlText(elm.innerHTML, i);
                });
            }
        }

        /**
         * 返回被选第一个元素的 大小和位置
         */
        offset() {
            return {
                left: this[0].offsetLeft,
                top: this[0].offsetTop,
                height: this[0].offsetHeight,
                width: this[0].offsetWidth
            }
        }

        load(url, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', url);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    this.each(function(elm, i) {
                        $(elm).html(xhr.responseText);
                    });

                    callback && callback();
                }
            }.bind(this);
        }

    }


    // export { init as $ };
})();