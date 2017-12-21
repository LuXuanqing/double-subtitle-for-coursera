Vue.component('tlang', {
    props: {
        track: Object
    },
    template: '<div class="lcontainer" v-on:click="toggle"><input type="checkbox" v-model="isShowing(track)"> <label>{{track.label}}</label></div>',
    methods: {
        isShowing: function (track) {
            return track.mode == 'showing'
        },
        toggle: function () {
            this.$emit('toggle-p')
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello chrome!',
        tracks: []
    },
    methods: {
        toggle: function (track) {
            this.send(track.label, (res) => {
                if (track.mode == 'showing') {
                    track.mode = 'hidden'
                } else {
                    track.mode = 'showing'
                }
                console.log(track)
            })
        },
        send: function (message, cb) {
            let query = {
                active: true,
                currentWindow: true
            }
            chrome.tabs.query(query, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message, function (res) {
                    console.log('Received response: ' + res)
                    cb(res)
                })
            })
        },
        print: function (msg='ok') {
            console.log(msg)
        }
    },
    created: function () {
        this.send('getAllTracks', (res) => {
            // console.log(JSON.parse(res))
            this.tracks = JSON.parse(res)
        })
    }
})

