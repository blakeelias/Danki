// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function getPageText(url, callback, errorCallback) {
    var x = new XMLHttpRequest();
    x.open('GET', url);
    // The Google image search API responds with JSON, so let Chrome parse it.                      
    x.responseType = 'text';
    x.onload = function() {
	// Parse and process the response from Google Image Search.                                   
	var response = x.response;
	if (!response) {
	    errorCallback('No response from \n' + url);
	    return;
	}
	callback(response);
    };
    x.onerror = function() {
	errorCallback('Network error.');
    };
    x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

//A function for drawing a row of a table with jQuery; we don't seem to need this now
function drawRow(rowData) {
	var row = $("<tr />")
	$("#flashcardTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
	row.append($("<td>" + rowData.front + "</td>"));
	row.append($("<td>" + rowData.back + "</td>"));
}

//I need these globals to make things work. There's probably a better way.
var flashcardList = [] //the list of flashcards loaded from memory
var currentCardFront = "" //the front and back of the current randomly-selected card
var currentCardBack = ""
var currentCardSide = "front" //"front" if displaying front, "back" if displaying back

//load the flashcards when the new tab page loads
window.onload = function() {
  //load the list into the global, make the table
  chrome.storage.sync.get("flashcardList", function(flashcards) {
	  flashcardList = flashcards.flashcardList;
	  fTable = document.getElementById("flashcardTable");
    for (i in flashcardList) {
      row = document.createElement("tr");
      front = document.createElement("td");
      front.appendChild(document.createTextNode(flashcardList[i].front));
      back = document.createElement("td");
      back.appendChild(document.createTextNode(flashcardList[i].back));
      row.appendChild(front);
      row.appendChild(back);
      fTable.appendChild(row);
	  }
  });
  //choose a card at random
  document.getElementById('continue').onclick = function(){
    var len = flashcardList.length;
    var i = Math.floor((Math.random() * len));
    currentCardFront = flashcardList[i].front;
    currentCardBack = flashcardList[i].back;
    currentCardSide = "front";
    document.getElementById('currentCard').textContent = currentCardFront;
  }
  //toggle back and front
  document.getElementById('flip').onclick = function(){
    if(currentCardSide == "front"){
      document.getElementById('currentCard').textContent = currentCardBack;
      currentCardSide = "back";
    }else{
      document.getElementById('currentCard').textContent = currentCardFront;
      currentCardSide = "front";
    }
  }
}
