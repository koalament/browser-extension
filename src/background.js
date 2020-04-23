function firefoxGetUrl() {
	return new Promise(resolve => {
		browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
			let tab = tabs[0]; // Safe to assume there will only be one result
			resolve(tab.url);
		}, console.error);
	});
}