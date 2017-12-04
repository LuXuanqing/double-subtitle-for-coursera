console.log('subtitle.js loaded')
var subtitle = {
    // div元素
    el: null,
    // 刷新div内的字幕
    fill: function () {
        now_text = document.querySelector('div.active').innerText
        console.log(now_text)
        subtitle.el.innerText = now_text
    },
    looper: null,
    start: function () {
        console.log('subtitle started')
        this.el.style.visibility = 'visible'
        this.looper = setInterval(this.fill, 800)
    },
    stop: function () {
        this.el.style.visibility = 'hidden'
        clearInterval(this.looper)
    },
    // 创建div元素并插入到页面中
    init: function () {
        var div = document.createElement('div')
        div.style.cssText = "z-index:1000; color: white; text-align: center; width: 100%; background-color: rgba(0, 0, 0, 0.5); position: absolute; font-size: 20px; padding: 3px; bottom: 0px; left: 50%; transform: translateX(-50%);"
        var videoContainer = document.querySelector('video').parentElement
        videoContainer.appendChild(div)
        this.el = div
    }
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'start') {
        if (!subtitle.el) {
            subtitle.init()
        }
        subtitle.start()
        sendResponse('start')
    } else if (message == 'stop') {
        subtitle.stop()
        sendResponse('stop')        
    }
})
