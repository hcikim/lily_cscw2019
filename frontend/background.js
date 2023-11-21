console.log('background running');

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete' && tab.active) {
		console.log("changed changed changed!!!");
		let msg = {
			txt: "hello"
		}
		setTimeout(function(){
			console.log('works!!! 3 second');
			chrome.tabs.sendMessage(tab.id, msg);
		}, 3000);
		// chrome.tabs.sendMessage(tab.id, msg);
		
		// chrome.storage.sync.set({
		// userWords:user
		// });
	}
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.type == 'info'){
			// console.log(request.value)
			
			var http = new XMLHttpRequest();
			var url = 'http://127.0.0.1:5000?'+request.value+"&"+request.type;
			// console.log(url)
			http.open('GET', url, true);
			//Send the proper header information along with the request
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			http.onreadystatechange = function() {//Call a function when the state changes.
			    if(http.readyState == 4 && http.status == 200) {
			    	// values
			        let result = http.responseText;
			        console.log(result + ": result here");
			        sendResponse({response: result});
			    }
			}
			http.send();

			return true;
		}
	}
);