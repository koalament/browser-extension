
import * as browser from "detect-browser";

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'https://nap.koalament.io/',
  LAYER_VERSION: 1,
  browser: browser.detect()
};