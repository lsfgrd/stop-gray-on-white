let color = '#000';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});
