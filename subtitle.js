/**
 * 获取指定语言的字幕
 * @param {string} language 目标字幕的语言，如'zh-CN'
 * @return {TextTrack} 
 */
function getTrack(language) {
    let vid = document.querySelector('video')
    if (!vid) {
        return null
    }
    // 获取所有字幕
    tracks = vid.textTracks
    if (tracks.length <= 0) {
        return null
    }
    // 遍历所有字幕
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].language == language) {
            return tracks[i]
        }
    }
    return null
}

// 为TextTrack对象的原型添加显示/隐藏字幕方法
window.TextTrack.prototype.show = function () {
    this.mode = 'showing'
}
window.TextTrack.prototype.hide = function () {
    this.mode = 'hidden'
}
window.TextTrack.prototype.toggle = function () {
    if (this.mode == 'showing') {
        this.hide()
    } else if (this.mode == 'hidden') {
        this.show()
    }
}


/**
 * 执行脚本，创建字幕按钮
 */
function go() {
    // 在视频播放器上添加控制第二字幕的按钮
    if (document.querySelector('#second-subtitle')) {
        // 检查按钮是否已存在，避免重复创建
        return false
    }

    // 创建按钮元素
    let btn = document.createElement('div')
    btn.setAttribute('class', 'c-video-control-btn vjs-control-content')
    btn.setAttribute('id', 'second-subtitle')
    // 创建按钮容器元素
    let wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'c-video-control vjs-control')
    // 把按钮插入容器中
    wrapper.appendChild(btn)
    // 把容器插入页面中
    let controlBar = document.querySelector('.vjs-control-bar')
    let subtitleControl = document.querySelector('.c-subtitles-control')
    controlBar.insertBefore(wrapper, subtitleControl)

    // 获取并显示字幕
    let cn = getTrack('zh-CN')
    cn.show()
    // 根据中文字幕是否存在，改变按钮文案和绑定事件
    if (cn) {
        btn.innerText = 'zh-CN'
        btn.addEventListener('click', function () {
            cn.toggle()
        })
    } else {
        btn.innerText = 'no CN'
    }
}

// 监听browser action的操作
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'start') {
        go()
        sendResponse('start')
    }
})