const reloadTab = () => chrome.tabs.reload();

const getCurrentTab = (): Promise<chrome.tabs.Tab> => new Promise((resolve, reject) => {
  try {
    chrome.tabs.query({
      active: true, currentWindow: true,
    }, (tabs) => {
      resolve(tabs[0]);
    });
  } catch (e) {
    reject(e);
  }
});

export { reloadTab, getCurrentTab };
