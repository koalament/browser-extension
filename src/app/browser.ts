import { environment } from 'src/environments/environment';

export function firefox(callback) {
    if (environment.browser.name === "firefox") {
        callback();
        return true;
    }
    return false;
}


export function chrome(callback) {
    if (environment.browser.name === "chrome") {
        callback();
        return true;
    }
    return false;
}