module.exports = {
    store: {
        available: () => browser.storage != undefined,
        set: (object) => {
            return new Promise((resolve, reject) => {
                browser.storage.sync.set(object, () => {
                    resolve(true);
                });
            });
        },
        get: (key) => {
            return new Promise((resolve, reject) => {
                browser.storage.sync.get([key], (result) => {
                    resolve(result);
                });
            });
        }
    },
    tabs: {
        available: () => browser.tabs != undefined,
        selected: {
            url: () => {
                return new Promise(resolve => {
                    browser.runtime.getBackgroundPage().then(w => {
                        w.firefoxGetUrl().then(url => resolve(url));
                    })
                });
            }
        },
        browserAction: {
            setBadgeText: (text) => {
                return new Promise(resolve => {
                    browser.tabs.getCurrent(null, tab => {
                        chrome.browserAction.setBadgeText({ text: text, tabId: tab.id }, () => {
                            resolve();
                        });
                    });
                });
            }
        }
    }
}