function $(str) {
	return document.getElementById(str);
}
function errorMessage(str, message) {
	let errorNodeId = `${str}-error`;
	let errorNode = $(errorNodeId);
	errorNode.innerText = `*${str} ` + message;
	$(str).style.border = "2px solid red";
}
function inputValidation(str) {
	let inputText = $(str).value;
	let inputLength = inputText.length;
	let inputValue = parseFloat(inputText);
	if (inputLength == 0) {
		errorMessage(str, `shouldn't be empty`);
		return -1;
	} else if (isNaN(inputValue)) {
		errorMessage(str, `should be a number`);
		return -1;
	} else if (inputValue < 0) {
		errorMessage(str, "should be non negative");
		return -1;
	}
	return inputValue;
}

function initialize() {
	let expenseNode = $("expenses");
	let balanceNode = $("balance");
	let savingNode = $("saving-amount");
	let remainingBalanceNode = $("remaining-balance");
	expenseNode.innerText =
		balanceNode.innerText =
		savingNode.innerText =
		remainingBalanceNode.innerText =
			"0";
	let inputNode = document.getElementsByTagName("input");
	for (const node of inputNode) {
		node.style.border = "2px solid black";
		node.innerText = "";
	}
	let errorNode = document.getElementsByClassName("error");
	for (const node of errorNode) {
		node.innerText = "";
	}
}
initialize();
$("calculate").onclick = function () {
	initialize();
	let income = inputValidation("income");
	let foodCost = inputValidation("food");
	let clothCost = inputValidation("cloth");
	let rentCost = inputValidation("rent");
	if (income == -1 || foodCost == -1 || clothCost == -1 || rentCost == -1) {
		return;
	}
	let totalCost = foodCost + clothCost + rentCost;

	if (totalCost > income) {
		errorMessage("expenses", `shouldn't exceed income`);
		$("expenses-error").style.fontSize = "12px";
		return;
	}
	$("expenses").innerText = `${totalCost}`;
	$("balance").innerText = `${income - totalCost}`;
};
