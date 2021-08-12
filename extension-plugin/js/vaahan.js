// make a or get request to server to get json data

// dummy json data

$(document).ready(function(){
	init();
});

function doAmazingThings() {
	var state = document.getElementById("state");
	var rto = document.getElementById("rto");
	var vnum = document.getElementById("regnum");
	var cnum = document.getElementById("chnum");
	var ennum = document.getElementById("enum");

    chrome.runtime.sendMessage({"message": "startVaahanProcess", "openURL": "https://vahan.parivahan.gov.in/vahanservice/vahan/ui/statevalidation/homepage.xhtml", 
								"selectedState":state, "selectedRto":rto, "selectedCnum":cnum, "selectedVnum":vnum, "selectedEnum":ennum})
	//window.open(dropdownSelectedValue, "_blank");
}


function init () {
	document.getElementById('vaahanSubmit').addEventListener('click', doAmazingThings);
}
