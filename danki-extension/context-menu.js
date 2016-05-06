// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function onClickFront(info, tab) {
    onClick(info, tab, "front");
}

function onClickBack(info, tab) {
    onClick(info, tab, "back");
}

function onClick(info, tab, frontOrBack) {  
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  var obj = {};
  obj[frontOrBack] = info.selectionText;
  chrome.storage.sync.get({"flashcardList": []}, function(list) {
    var l = list["flashcardList"];
    l.push(obj);
    chrome.storage.sync.set({"flashcardList": l});
  });
}

// Create one test item for each context type.
var contexts = ["selection", "link"];

var idFront = chrome.contextMenus.create({"title": "Create flashcard front", "contexts":contexts,
                                       "onclick": onClickFront});

var idBack = chrome.contextMenus.create({"title": "Create flashcard back", "contexts":contexts,
                                       "onclick": onClickBack});

console.log("item front:" + idFront);
console.log("item back:" + idBack);
