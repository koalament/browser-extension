import { environment } from 'src/environments/environment';

export function firefox(callback) {
    if (environment.browser.name === "firefox") {
        callback();
    }
}