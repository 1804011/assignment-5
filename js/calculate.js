let errorNode = document.getElementsByClassName("error");
for (const node of errorNode) {
	node.innerText = "";
}
function $(str) {
	return document.getElementById(str);
}

function inputValidation(str) {
	let txt = $(str).value;
	if (txt.length == 0) {
		$(str).style.border = "2px solid red";
		let errorNode = $(`${str}-error`);
		errorNode.innerText = `*${str} shouldn't be empty`;
		return false;
	}
	for (let i = 1; i < txt.length; i++) {
		if (txt[i] < "0" || txt[i] > "9") {
			$(str).style.border = "2px solid red";
			let errorNode = $(`${str}-error`);
			errorNode.innerText = `*${str} should be a number`;
			return false;
		}
	}
	txt = parseInt(txt);
	if (isNaN(txt)) {
		$(str).style.border = "2px solid red";
		let errorNode = $(`${str}-error`);
		errorNode.innerText = `*${str} should be a number`;
		return false;
	} else if (txt < 0) {
		$(str).style.border = "2px solid red";
		let errorNode = $(`${str}-error`);
		errorNode.innerText = `*${str} should be non negative`;
		return false;
	}
	$(str).innerText = "";
	return txt;
}
$("calculate").onclick = function () {
	$("balance").innerText = $("expenses").innerText = "0";
	let incomeInputValue = inputValidation("income");
	let foodInputValue = inputValidation("food");
	let rentInputValue = inputValidation("rent");
	let clothInputValue = inputValidation("cloth");

	if (
		!incomeInputValue ||
		!foodInputValue ||
		!rentInputValue ||
		!clothInputValue
	)
		return;
	let totalExpenses = foodInputValue + rentInputValue + clothInputValue;
	if (totalExpenses > incomeInputValue) {
		$("expenses-error").innerText = `Expenses can't exceed income`;
		$("expenses-error").style.fontSize = "12px";
		return;
	}
	$("expenses-error").innerText = "";
	$("balance").innerText = `${incomeInputValue - totalExpenses}`;
	$("expenses").innerText = `${totalExpenses}`;
};
