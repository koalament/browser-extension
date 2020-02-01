var socket_address = 'https://nap.koalament.io'
var gzip = require('node-gzip').gzip;
var io = require("socket.io-client");
var Swal = require("sweetalert2").default;
var moment = require("moment");
var $ = require("jquery");
var socket = io.connect(socket_address, { reconnection: false });
var moneyButton = require('./money-button');

socket.on("error_on_read", function (error) {
	alert(JSON.stringify(error));
})
socket.on("error_on_comment", function (error) {
	alert(JSON.stringify(error));
})

socket.on("read_answer", function (json) {
	makeCommentsHtml(json);
})
function toHex(str) {
	try {

		hex = unescape(encodeURIComponent(str))
			.split('').map(function (v) {
				return v.charCodeAt(0).toString(16)
			}).join('')
	} catch (e) {

		hex = str
		console.log('invalid text input: ' + str)
	}
	return hex

}
function makeSingleCommentSpan(comment) {
	var date = moment(comment.created_at);
	return '<span>' + comment.text + '</span><span style="color: gray;font-size: 0.7em;">' + date.fromNow() + '<a target="_blank" href="https://whatsonchain.com/tx/' + comment._txid + '">🔗</a></span>'
}
function onComment(comment) {
	$("#koalament_comments").append("<hr/>" + makeSingleCommentSpan(comment));
	var objDiv = document.getElementById("koalament_comments");
	objDiv.scrollTop = objDiv.scrollHeight;
}

function makeCommentsHtml(json) {
	var htmlContent = document.getElementById("swal2-content");
	var content = '<div id="koalament_comments" style="text-align: left;height: 200px;overflow-y: scroll;"';
	if (json && json.results && json.results.length > 0) {
		content += json.results.map(function (p) {
			return makeSingleCommentSpan(p)
		}).join("<hr/>") + '</div><br/></div>';
	} else {
		content += '<div style="text-align:center;">Be the first one who comment on this page!</div></div><hr/>';
	}
	content += '<div style="text-align:center"><span>Your comment</span><span><form><textarea id="message" class="tohex" rows="10" cols="30" style="width:70%;height:50px;"></textarea></form></span><div id="button-here"></div>';
	htmlContent.innerHTML = content;
	var objDiv = document.getElementById("koalament_comments");
	objDiv.scrollTop = objDiv.scrollHeight;
	$(".tohex").on("change keyup paste", function () {
		var data = { key: document.location.href, text: $(this).val() };
		var div = document.getElementById('button-here');
		gzip(Buffer.from('0 ' + JSON.stringify(data), "utf-8"))
			.then(function (compressed) {
				moneyButton.render(div, {
					label: "Send",
					clientIdentifier: "36a0fd92080022d9234e610de329e13d",
					buttonId: "234325",
					outputs: [
						{
							to: '14781',
							amount: '0.005',
							currency: 'USD'
						},
						{
							script: 'OP_FALSE OP_RETURN ' + toHex('koalament 1 gzip ' + compressed.toString("base64")),
							amount: '0',
							currency: 'USD'
						}
					],
					onPayment: function (arg) {
						$(".tohex").val("");
						if (!arg || !arg.txid) {
							alert("Something went wrong!")
						}
					},
					onError: function (arg) { alert("Something went wrong!"); console.log('onError', arg) }
				})
			})
	})
}
var fetchData = function () {
	socket.emit("read", {
		key: document.location.href,
		from: 0,
		limit: 100
	})
}
socket.on(btoa(document.location.href + "_1"), onComment)
function dc() {
	socket.close();
}
var show = function () {
	Swal.fire({
		position: 'center',
		title: 'Comments',
		showConfirmButton: false,
		html: "<div>Loading...</div>",
		onRender: function () {
			fetchData();
		},
		onClose: function () {
			dc();
		}
	})
}
show();
