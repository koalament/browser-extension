chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.executeScript(tab.ib, {
		file: 'bundle.js'
	});
});