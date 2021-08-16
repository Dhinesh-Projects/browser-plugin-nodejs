// make a or get request to server to get json data

// dummy json data
var jsonData = '{"success":"true","data":[{"name":"Vaahan","link":"https://vahan.parivahan.gov.in/vahanservice/vahan/ui/statevalidation/homepage.xhtml"},{"name":"DL","link":"https://sarathi.parivahan.gov.in/sarathiservicecov/sarathiHomePublic.do"}]}';
console.log("onRequest : " + jsonData);

$(document).ready(function(){
	init();
});

function doAmazingThings1() {
	var selectDropdown = document.getElementById("nbfDropdown");
	var dropdownSelectedValue = selectDropdown.options[selectDropdown.selectedIndex].value;
	console.log("URL from html - "+dropdownSelectedValue);

    chrome.runtime.sendMessage({"message": "startProcess", "service": selectDropdown.options[selectDropdown.selectedIndex].text, "openURL": dropdownSelectedValue})
	//window.open(dropdownSelectedValue, "_blank");
}


function init () {
    var selectDropdown = document.getElementById("nbfDropdown");
    var jsonObj = JSON.parse(jsonData);
    if ( jsonObj.success == "true" ) {
    	for (var i = 0; i < jsonObj.data.length; i++ ) {
    		console.log(jsonObj.data[i].name);
    		selectDropdown.innerHTML += '<option class="dropdown-item" value="' + jsonObj.data[i].link + '" >' + jsonObj.data[i].name + '</option>';
    	}    
		document.getElementById('nbfSubmit').addEventListener('click', doAmazingThings1);
    } else {
    	alert("json is wrong");    
    }
}
