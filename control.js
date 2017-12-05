// var stopBtn = document.querySelector('#stop')
const go = document.querySelector('#go')
go.addEventListener('click', function() {
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'start', function(res) {
            console.log(res)
        })
    })
})
