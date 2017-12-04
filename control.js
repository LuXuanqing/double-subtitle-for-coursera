var stopBtn = document.querySelector('#stop')
var startBtn = document.querySelector('#start')
startBtn.addEventListener('click', function() {
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'start', function(res) {
            console.log(res)
        })
    })
})
stopBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'stop', function (res) {
            console.log(res)
        })
    })
})