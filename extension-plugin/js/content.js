// content.js

// change tab heading
var maxSteps = 100;
var bankDomain = "";

$(document).ready(function() {
    document.title = "NBF Fetch";

    currentURL = $(location).attr('href');
    if ( currentURL == bankDomain ) {
        chrome.runtime.sendMessage({"message": "resetCounter"});
    }
    chrome.runtime.sendMessage({"message": "getInstructionSet"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	console.log("step counter: " + request.step);
        console.log("instruction set: " + request.instructionSet.instruction);
        console.log("instruction set: " + request.instructionSet.getNextInstruction);

    	// increasing counter
    	chrome.runtime.sendMessage({"message": "nextStep"});
    	var data = eval(request.instructionSet.instruction);
        if ( request.instructionSet.send == "1" ) {
            chrome.runtime.sendMessage({"message": "collect", "data": data});
        }

        if ( request.instructionSet.getNextInstruction == "1" ) {
            chrome.runtime.sendMessage({"message": "getInstructionSet"});
        } else if ( request.instructionSet.getNextInstruction == "0" && request.instructionSet.pageLoading == "0" ) {
            chrome.runtime.sendMessage({"message": "setProcessingFlag", "processingFlag": "0", "bankDomain": currentURL});
        }
    }
  }
);