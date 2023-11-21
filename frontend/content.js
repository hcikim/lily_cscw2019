console.log("Chrome extension go?");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message) {

	if (message.txt === "hello") {
		console.log("Hello, there")
		let code = document.querySelector("#msg_input > div.ql-editor");
		code.setAttribute("id", "input");
		// console.log(code);
	
		let input_line = document.querySelector("#input > p");
		// console.log(input_line);
		
		buildFrame(code, input_line);
		
		let b1 = document.querySelector("#autocomplete_list > span:nth-child(1)");
		let b2 = document.querySelector("#autocomplete_list > span:nth-child(2)");
		let b3 = document.querySelector("#autocomplete_list > span:nth-child(3)");

		let key = [];
		blankspace = "&nbsp".repeat(36);
		code.onkeyup = function(e){

			if(e.keyCode == 13){
				key = [];

				b1.removeAttribute('style');
				b2.removeAttribute('style');
				b3.removeAttribute('style');

				b1.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");
				b2.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");
				b3.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");

				b1.innerHTML = blankspace;
				b2.innerHTML = blankspace;
				b3.innerHTML = blankspace;

			} else if(e.keyCode == 32){
				key.push(e.keyCode);

				if(key.length == 2){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 3){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 4){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 5){
					sendrecvData(b1, b2, b3, input_line);	

				} else if(key.length == 6){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 7){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 8){
					sendrecvData(b1, b2, b3, input_line);

				} else if(key.length == 9){
					sendrecvData(b1, b2, b3, input_line);

				};
			};
		};
	};
};


function buildFrame(doc, inner){
	var a = document.createElement("DIV");
	a.setAttribute("id", "autocomplete_list");
	a.setAttribute("class", "autocomplete-items");
	a.setAttribute("style", "padding: 10px;");

	blankspace = "&nbsp".repeat(36);

	contents = [ blankspace, blankspace, blankspace ];


	// var b0 = document.createElement('img');
	// b0.setAttribute("align", "middle");
	// b0.setAttribute("style", "cursor: pointer")
	// b0.src = chrome.extension.getURL('refresh.png');
	// b0.setAttribute("onclick", "sendrecvData()")

	var b1 = document.createElement('span');
	b1.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");
	b1.innerHTML = '<i><b>' + contents[0] + '</b></i>';
	// b1.innerHTML += "<input type='hidden' value='" + contents[0] + "'>";

	var b2 = document.createElement('span');
	b2.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");
	b2.innerHTML = '<i><b>' + contents[1] + '</b></i>';
	// b2.innerHTML += "<input type='hidden' value='" + contents[1] + "'>";

	var b3 = document.createElement('span');
	b3.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid lightcyan; border-radius: 15px; padding: 6px; cursor: none;");
	b3.innerHTML = '<i><b>' + contents[2] + '</b></i>';
	// b3.innerHTML += "<input type='hidden' value='" + contents[2] + "'>";

	doc.parentNode.appendChild(a);
	
	// a.appendChild(b0);
	a.appendChild(b1);
	a.appendChild(b2);
	a.appendChild(b3);
};

function editSentence(b1, b2, b3, inner, contents){

	b1.removeAttribute('style');
	b2.removeAttribute('style');
	b3.removeAttribute('style');

	b1.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid skyblue; border-radius: 15px; padding: 6px; cursor: none;");
	b2.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid skyblue; border-radius: 15px; padding: 6px; cursor: none;");
	b3.setAttribute("style", "margin-left:5px; margin-right:5px; border: 2px solid skyblue; border-radius: 15px; padding: 6px; cursor: none;");

	b1.setAttribute("title", "It is more recommended you to type it by yourself");
	b2.setAttribute("title", "It is more recommended you to type it by yourself");
	b3.setAttribute("title", "It is more recommended you to type it by yourself");

	b1.innerHTML = '<i><b>' + contents[0] + '</b></i>';
	b2.innerHTML = '<i><b>' + contents[1] + '</b></i>';
	b3.innerHTML = '<i><b>' + contents[2] + '</b></i>';

};

function sendrecvData(a, b, c, line){
	var text = document.querySelector("#input > p").innerText;
	chrome.runtime.sendMessage({type: 'info', value: text}, function(response){
		var recos = JSON.parse(response.response);

		// var date = new Date();
		// var time = date.getTime();
		// var seed = Math.floor(((time % 100) / 100) * 19);
		
		recomms = [recos[0], recos[1], recos[2]];
		editSentence(a, b, c, line, recomms);
		text = ""
		recos = []
	});
};
