// 定义一个缓动函数，用于实现平滑的动画效果，其中t是当前时间，b是起始值，c是变化量，d是持续时间
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    // 如果当前时间小于持续时间的一半，则使用二次缓入函数
    if (t < 1) {
        return c / 2 * t * t + b
    }
    // 如果当前时间大于等于持续时间的一半，则使用二次缓出函数
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
// 定义一个requestAnimationFrame函数，用于实现平滑的动画效果
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * 定义一个move函数，用于移动滚动条
 * @param {number} amount
 */
function move(amount) {
    // 将滚动条移动到指定位置
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
}

// 定义一个position函数，用于获取滚动条的位置
function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
// 定义一个scrollTo函数，用于实现平滑的滚动效果
export function scrollTo(to, duration, callback) {
    // 获取起始位置
    const start = position()
    // 计算变化量
    const change = to - start
    // 设置每次递增的值
    const increment = 20
    // 初始化当前时间
    let currentTime = 0
    // 设置默认的持续时间
    duration = (typeof (duration) === 'undefined') ? 500 : duration
    // 定义一个animateScroll函数，用于实现动画效果
    var animateScroll = function () {
        // increment the time
        currentTime += increment
        // find the value with the quadratic in-out easing function
        var val = Math.easeInOutQuad(currentTime, start, change, duration)
        // move the document.body
        move(val)
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll)
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback()
            }
        }
    }
    animateScroll()
}
