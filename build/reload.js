/*  eslint-disable  */
(function () {
    let last_timestamp
    let reload_interval

    last_timestamp = null

    reload_interval = function () {
        let xhr
        xhr = new XMLHttpRequest()
        xhr.open('GET', 'reload.html')
        xhr.send(null)
        return (xhr.onload = function () {
            if (last_timestamp !== xhr.responseText) {
                console.log('reloading: ' + last_timestamp)
                last_timestamp = xhr.responseText
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]) {
                        chrome.tabs.reload(tabs[0].id); // Reloads Active Tab
                    }
                    chrome.runtime.reload(); // Reloads Extension
                });
                // return chrome.runtime.reload()
            }
        })
    };
    (function () {
        let xhr
        xhr = new XMLHttpRequest()
        xhr.open('GET', 'reload.html')
        xhr.send(null)
        return (xhr.onload = function () {
            last_timestamp = xhr.responseText
            return setInterval(reload_interval, 1000)
        })
    }())
}.call(this))
