/**
 * 发送信息到当前标签
 * @param {string} message 
 * @param {function} cb 
 */
function send(message, cb) {
    const query = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(query, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function(res) {
            cb(res)
        })
    })
}

// 打开popup页面后请求字幕数据，然后渲染到列表中
window.onload = function () {

}

const go = document.querySelector('#go')
go.addEventListener('click', function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'start', function (res) {
            console.log(res)
        })
    })
})

const test = document.querySelector('#test')
test.addEventListener('click', function () {
    send('test')
})