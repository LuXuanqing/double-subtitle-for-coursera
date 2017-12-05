// alert('subtitle.js has been loaded')


// 获取指定language的textTrack
function getTrack(language) {
    // 获取video
    let vid = document.querySelector('video')
    if (!vid) {
        return false
    }
    // 获取所有字幕
    tracks = vid.textTracks
    if (tracks.length <= 0) {
        return false
    }
    // 遍历所有字幕
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].language == language) {
            return tracks[i]
        }
    }
    return false
}

// 显示/隐藏 字幕
function showSubtitle(track) {
    track.mode = 'showing'
}

function hideSubtitle(track) {
    track.mode = 'hidden'
}

function toggleSubtitle(track) {
    if (track.mode == 'hidden') {
        showSubtitle(track)
    } else {
        hideSubtitle(track)
    }
}


function go() {
    if (document.querySelector('#second-subtitle')) {
        alert('字幕已存在')
        return false
    }
    // 获得简体中文字幕
    let cn = getTrack('zh-CN')
    
    if (cn) {
        // 创建按钮
        let btn = document.createElement('div')
        btn.setAttribute('class', 'c-video-control-btn vjs-control-content')
        btn.setAttribute('id', 'second-subtitle')
        btn.innerText = 'zh-CN'
        // 创建按钮容器
        let wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'c-video-control vjs-control')
        // 把按钮插入容器中
        wrapper.appendChild(btn)
        // 把容器插入页面中
        let controlBar = document.querySelector('.vjs-control-bar')
        let subtitleControl = document.querySelector('.c-subtitles-control')
        controlBar.insertBefore(wrapper, subtitleControl)
        // 添加点击事件
        btn.addEventListener('click', function () {
            toggleSubtitle(cn)
        })
        alert('succeeded')
    } else {
        alert('no zh-CN')
    }
}
setTimeout(go,8000)

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'start') {
        go()
        sendResponse('start')
    }
})