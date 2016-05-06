//Allow users to create and save flashcards with right-click menus

var contexts = ["selection", "link"];

//Remember the front side, create a matching back side option
function onClickFront(info, tab) {
	var frontSide = info.selectionText;
	chrome.contextMenus.create({"title": "Create back of \"" + frontSide + "\" card", "contexts":contexts, "onclick": onClickBackMaker(frontSide)});
}

//Return a callback that saves the card and returns the option
function onClickBackMaker(frontSide) {
    return function(info, tab){
    	var backSide = info.selectionText;
    	var card = processCard(frontSide, backSide);
    	chrome.storage.sync.get({"flashcardList": []}, function(list) {
    		var l = list["flashcardList"];
    		l.push(card);
    		chrome.storage.sync.set({"flashcardList": l});
  		});
  		chrome.contextMenus.remove(info.menuItemId);
    };
}

//Processes frontside and backside to make a card
//Currently does nothing
function processCard(frontSide, backSide){
	return {"front": frontSide, "back":backSide};
}

//remember the front side of the card in case you need to 
var idFront = chrome.contextMenus.create({"title": "Create flashcard front", "contexts":contexts, "onclick": onClickFront});
