let available = () => chrome != undefined;
let set = (object) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(object, () => {
            resolve(true);
        });
    });
};

let get = (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], (result) => {
            resolve(result);
        });
    });
};

module.exports = {
    available: available,
    set: set,
    get: get
}