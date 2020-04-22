import { environment } from 'src/environments/environment';

export function firefox(callback) {
    if (environment.browser.name === "firefox") {
        callback();
    }
}


export function chrome(callback) {
    if (environment.browser.name === "chrome") {
        callback();
    }
}