let store_available = () => chrome.storage != undefined;

let store_set = (object) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(object, () => {
            resolve(true);
        });
    });
};

let store_get = (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], (result) => {
            resolve(result);
        });
    });
};


module.exports = {
    store: {
        available: store_available,
        set: store_set,
        get: store_get
    }
}