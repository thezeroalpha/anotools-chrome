chrome.runtime.onInstalled.addListener(function() {
  var parentMenu = chrome.contextMenus.create({"title": "Anotools", "id": "anotools", "visible": false});
  chrome.contextMenus.create({"title": "Outline.com", "id": "outline", "parentId": parent.id})
  chrome.contextMenus.create({"title": "Hypothes.is", "id": "hypothesis", "parentId": parent.id})
});

chrome.contextMenus.onClicked.addListener(function handleContextMenuClick(info, tab) {
  function sanitize(url) {
    return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  function outline(tab) {
    var newUrl = "https://outline.com/"+sanitize(tab.url);
    chrome.tabs.update(tab.id, {url: newUrl});
  }

  function hypothesis(tab) {
    var newUrl = "https://via.hypothes.is/"+sanitize(tab.url);
    chrome.tabs.update(tab.id, {url: newUrl});
  }

  var clickedId = info.menuItemId;
  if (clickedId == "outline") {
    outline(tab);
  }
  else {
    hypothesis(tab);
  }
});
