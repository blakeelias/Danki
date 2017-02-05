// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function drawRow(rowData) {
	var row = $("<tr />")
	$("#flashcardTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
	row.append($("<td>" + rowData.front + "</td>"));
	row.append($("<td>" + rowData.back + "</td>"));
}

document.addEventListener('DOMContentLoaded', function() {
		//  alert("in DOMContentLoaded");
  chrome.storage.sync.get("flashcardList", function(flashcards) {
		  document.getElementById("status").textContent = "test<br />";
		  var l = flashcards.flashcardList;
		 
		  for (i in l) {
			  c = document.getElementById("flashcardTable").lastChild;
			  c.innerHTML += "<tr><td>hello</td><td>hello</td></tr>";
			  c.lastChild.childNodes[0].textContent = l[i].front;
			  c.lastChild.childNodes[1].textContent = l[i].back;
			  }
  });
});
