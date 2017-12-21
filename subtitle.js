/**
 * 获取指定语言的字幕
 * @param {string} label 目标字幕的语言，如'zh-CN'
 * @return {TextTrack} 
 */
function getTrackByLabel(label) {
    let vid = document.querySelector('video')
    if (!vid) {
        return null
    }
    // 获取所有字幕
    let tracks = vid.textTracks
    if (tracks.length <= 0) {
        return null
    }
    // 遍历所有字幕
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].label == label) {
            return tracks[i]
        }
    }
    return null
}


/**
 * 获取所有字幕，返回一个包含label和mode的数组
 * @return {array}
 */
function getAllTracks() {
    let vid = document.querySelector('video')
    if (!vid) {
        return null
    }
    // 需要返回的结果
    let result = []
    // 获取所有字幕
    let tracks = vid.textTracks
    if (tracks.length <= 0) {
        return null
    }
    // 遍历所有字幕
    for (let i = 0; i < tracks.length; i++) {
        let track = {
            label: tracks[i].label,
            mode: tracks[i].mode,
            language: tracks[i].language
        }
        result.push(track)
    }
    return result
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
    console.log(this.label + ': ' + this.mode)
}


// 监听browser action的操作
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Received message: ' + message)
    switch (message) {
        case 'getAllTracks':
            let tracks = getAllTracks()
            console.log(tracks)
            sendResponse(JSON.stringify(tracks))
            break
        default:
            let track = getTrackByLabel(message)
            track.toggle()
    }
})