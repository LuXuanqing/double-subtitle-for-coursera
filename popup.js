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
        chrome.tabs.sendMessage(tabs[0].id, message, function (res) {
            console.log('Received response: ' + res)
            cb(res)
        })
    })
}


const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello chrome!',
        tracks: []
    },
    methods: {
        toggle: function (track) {
            send(track.label, (res) => {
                if (track.mode == 'showing') {
                    track.mode = 'hidden'
                } else {
                    track.mode = 'showing'
                }
                // console.log(track)
            })
            
        }
    },
    created: function () {
        send('getAllTracks', (res) => {
            // console.log(JSON.parse(res))
            this.tracks = JSON.parse(res)
        })
    }
})