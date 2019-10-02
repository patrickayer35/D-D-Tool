function showElement(e) {
	document.getElementById(e).style.display = "block";
}

function hideElement(e) {
	document.getElementById(e).style.display = "none";
}

function startNewSession() {
	hideElement("start-container");
	showElement("manager-menu");
}

function loadPreviousSession() {
    // do something
}

function backToHome() {
	if (characters.length > 0) {
		var c = confirm("Returning to startup will delete any unsaved data. Continue?");
		if (c) {
			deleteAllTableRows("character-list-table");
			hideElement('right-container');
			characters = [];
		}
	}
	//hideCharacterForms();
	hideElement("manager-menu");
	showElement("start-container");
}

function editSession() {
    hideElement("manager-menu");
	showElement("edit-menu");
	enableEditingButtons();
}

function doneEditing() {
	hideElement("edit-menu");
	showElement("manager-menu");
	disableEditingButtons();
}

function createCharacterButton(i, unique, name, race) {
	input = document.createElement("button");
	input.type = "button";
	input.id = "character-button-".concat(i);
	input.className = "character-btn";
	input.style = "width:200px;"
	if (unique) {
		input.innerHTML = "*".concat(name);
	}
	else {
		input.innerHTML = race;
	}
	input.disabled = true;
	return input;
}

function createEditButton(i) {
	input = document.createElement("button");
	input.type = "button";
	input.id = "edit-character-".concat(i);
	input.className = "edit-character-btn";
	input.innerHTML = "Edit";
	input.addEventListener("click", function () { bindEditButton(i) }, false);
	return input;
}

function createDeleteButton(i) {
	input = document.createElement("button");
	input.type = "button";
	input.id = "delete-from-manager-btn-".concat(i);
	input.className = "delete-from-manager-btn";
	input.innerHTML = "X Delete";
	input.addEventListener("click", function () { bindDeleteButton(i) }, false);
	return input
}

function createPassivePerceptionScore(i, passivePerception) {
	p = document.createElement("p");
	p.id = "character-passive-perception-".concat(i);
	p.className = "passiver-perception-indicator";
	p.innerHTML = "PP: ".concat(passivePerception);

	return p;
}

function addCharacterToColumn(unique, name, race, passivePerception, i) {

	var table = document.getElementById("character-list-table");
	var tr = document.createElement("tr");
	tr.className = "character-row";
	tr.id = "character-row-".concat(i);
	table.appendChild(tr);

	td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(createCharacterButton(i, unique, name, race));

	td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(createEditButton(i));

	td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(createDeleteButton(i));

	td = document.createElement("td");
	tr.appendChild(td);
	td.appendChild(createPassivePerceptionScore(i, passivePerception));
}

function bindEditButton(i) {
	disableEditingButtons();
	hideElement("edit-menu");
	if (characters[i] instanceof PC) {
		pcEdit = Number(i);
		launchPCEditForm();
	}
	else {
		npcEdit = Number(i);
		launchNPCEditForm();
	}
}

function bindDeleteButton(i) {
	var c = confirm("Are you sure you want to delete this character?");
	if (c) {
		var row = document.getElementById("character-row-".concat(i));
		delete characters[Number(i)];
		document.getElementById("character-list-table").deleteRow(row.rowIndex);
		if (document.getElementById("character-list-table").rows.length == 0) {
			document.getElementById("right-container").style.display = "none";
		}
	}
}

function disableEnableButtons(btnClass, a) {
	var buttons = document.getElementsByClassName(btnClass);
	for (var i = 0, elem; elem = buttons[i]; i++) {
		elem.disabled = a;
	}
}

function disableEditingButtons() {
	disableEnableButtons("edit-character-btn", true);
	disableEnableButtons("delete-from-manager-btn", true);
}

function enableEditingButtons() {
	disableEnableButtons("edit-character-btn", false);
	disableEnableButtons("delete-from-manager-btn", false);
}

function deleteAllTableRows(tableId) {
	var rows = document.getElementById(tableId).rows.length;
	for (var i = rows - 1; i >= 0; i--) {
		document.getElementById(tableId).deleteRow(i);
	}
}


/*
	input = document.createElement("button");
	input.type = "button";
	input.id = "delete-from-manager-btn-".concat(i);
	input.className = "delete-from-manager-btn";
	input.innerHTML = "X Delete";
//input.addEventListener("click", function () { bindDeleteButton(i) }, false);
	td.appendChild(input);

	td = document.createElement("td");
	tr.appendChild(td);

	input = document.createElement("button");
	input.type = "button";
	input.id = "edit-character-".concat(i);
	input.className = "edit-character";
	input.innerHTML = "Edit";
//input.addEventListener("click", function () { bindEditButton(i) }, false);
	td.appendChild(input);

	td = document.createElement("td");
	tr.appendChild(td);

	p = document.createElement("p");
	p.className = "passiver-perception-indicator";
	p.id = "character-passive-perception".concat(i);
	p.innerHTML = "PP: ".concat(c.passivePerception);
	td.appendChild(p);

}
*/

/*
function addCharacterToColumn(c, i) {
	//console.log("133");
var table = document.getElementById("character-list-table");
var tr = document.createElement("tr");
tr.className = "character-row";
tr.id = "character-row-".concat(i);
table.appendChild(tr);

td = document.createElement("td");
tr.appendChild(td);

var input = document.createElement("button");
input.type = "button";
input.id = "character-button".concat(i);
input.className = "character-button";
input.style = "width:150px;"
if (c.unique) {
input.innerHTML = "*".concat(c.characterName);
//input.style = "color:DarkRed;width:120px";
}
else {
input.value = c.characterRace;
//input.style = "color:black;width:120px";
}
input.disabled = true;
//input.addEventListener("click", function () { bindCharacterButton(this, i) }, false);
td.appendChild(input);

td = document.createElement("td");
tr.appendChild(td);

input = document.createElement("button");
input.type = "button";
input.className = "delete-from-manager-btn";
input.id = "delete-from-manager-btn".concat(i);
input.innerHTML = "X Delete";
//input.addEventListener("click", function () { bindDeleteButton(i) }, false);
td.appendChild(input);

td = document.createElement("td");
tr.appendChild(td);

input = document.createElement("button");
input.type = "button";
input.id = "edit-character".concat(i);
input.className = "edit-character";
input.innerHTML = "Edit";
//input.addEventListener("click", function () { bindEditButton(i) }, false);
td.appendChild(input);

td = document.createElement("td");
tr.appendChild(td);

p = document.createElement("p");
p.className = "passiver-perception-indicator";
p.id = "character-passive-perception".concat(i);
p.innerHTML = "PP: ".concat(c.passivePerception);
td.appendChild(p);
}
*/