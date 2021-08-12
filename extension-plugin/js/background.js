// background.js
'use strict';

var service = '';
var activeTab = '';
var tabId = '';
var data = '';
var hash = [];
var currentInstructioinSet = "";
var nextInstructioinSet = "login";
var maxSteps = 0;
var stepsCounter = 0;


function init (_data) {
  hash = _data.steps;
  currentInstructioinSet = _data.name;
  nextInstructioinSet = _data.getNextStep;
  maxSteps = _data.maxCounter;

  console.log();

  chrome.tabs.sendMessage(tabId, {"message": "clicked_browser_action", "step": stepsCounter, "instructionSet" : hash[stepsCounter], "nextFlag": "0"});
};

chrome.runtime.onInstalled.addListener(function() {
  console.log("Application Started");
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('Request recieved ' + request.message);
      if (request.message == 'startProcess') {
        service = request.service;
        console.log("Service opted is - "+request.service);
        console.log("Opening url for service - "+request.url);
        if (service == 'Vaahan') {
          chrome.tabs.create({ "url": 'vaahan_home.html'});
        }
        // $.getJSON("http://localhost:3030/?txnId=123456&service="+service+ "&step=login", 
        //   function(data, status){
        //     console.log("Response status recieved - "+status);
        //     console.log("Step name - "+data.name);
        //   });
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          activeTab = tabs[0];
          tabId = activeTab.id;
          console.log("tab id: " + tabId);
        });
      } else if (request.message == 'startVaahanProcess') {
        $.getJSON("http://localhost:3030/?txnId=123456&service="+service+ "&step=login", 
          function(data, status){
            console.log("Response status recieved - "+status);
            console.log("Step name - "+data.name);
            // chrome.tabs.sendMessage(tabId);
          });
          chrome.tabs.create({"url": request.openURL});
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            activeTab = tabs[0];
            tabId = activeTab.id;
            console.log("tab id: " + tabId);
          });
          init(data);
      }
      
  });