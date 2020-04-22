module.exports = {
    store: {
        available: () => chrome.storage != undefined,
        set: (object) => {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.set(object, () => {
                    resolve(true);
                });
            });
        },
        get: (key) => {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get([key], (result) => {
                    resolve(result);
                });
            });
        }
    },
    tabs: {
        available: () => chrome.tabs != undefined,
        selected: {
            url:  (tab) => {
                return new Promise(resolve => {
                    chrome.tabs.getSelected(null ,tab => {
                        resolve(tab.url)
                    });
                });
            }
        }
    },
    browserAction: {
        setBadgeText: (text) => {
            return new Promise(resolve => {
                chrome.browserAction.setBadgeText({text: text}, () => {
                    resolve();
                });
            });
        }
    }
}