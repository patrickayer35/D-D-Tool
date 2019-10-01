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

function editSession() {
    hideElement("manager-menu");
    showElement("edit-menu");
}

function createCharacterButton(i, unique, name, race) {
	input = document.createElement("button");
	input.type = "button";
	input.id = "character-button-".concat(i);
	input.className = "character-button";
	input.style = "width:150px;"
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
	input.className = "edit-character";
	input.innerHTML = "Edit";

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

function bindEditButton() {

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








function hideCharacterForms() {
	document.getElementById("pc-form").style.display = "none";
	document.getElementById("npc-form").style.display = "none";
}
/*
function editSession() {
	hideElement("mid-session-buttons");
	showElement("edit-session-buttons");
	disableEnableButtons("dynamic-button character-name-btn", true);
	disableEnableButtons("dynamic-button delete-from-manager-btn", false);
	disableEnableButtons("dynamic-button edit-character", false);
}
*/

function backToHome() {
	if (characters.length > 0 || partiallyFilledPCForm() || partiallyFilledNPCForm()) {
		var c = confirm("Returning to startup will delete any unsaved data. Continue?");
		if (c) {
			characters = [];
			clearPCForm();
			clearNPCForm();
			deleteAllTableRows("character-list-table");
			hideElement('character-list-container');
			characters = [];
		}
	}
	hideCharacterForms();
	hideElement("mid-session-buttons");
	showElement("startup-buttons");
	//hideElement("mid-session-buttons");
	//showElement("startup-buttons");
	//hideElement("character-list-header");
	//hideElement("edit-current-session-buttons");
	//hideElement("running-the-session-buttons");
	//showElement("startup-buttons");
}

function showCharacterForm(e) {
	hideElement("edit-session-buttons");
	showElement(e);
}

function showNPCHelpGuide(e) {
	showElement("npc-form-help-guide");
	hideElement(e);
}

function doneEditing() {
	hideElement("edit-session-buttons");
	showElement("mid-session-buttons");
	disableEnableButtons("dynamic-button delete-from-manager-btn", true);
	disableEnableButtons("dynamic-button edit-character", true);
	//doneAddingCharacters();
}

function disableEnableButtons(btnClass, a) {
	var buttons = document.getElementsByClassName(btnClass);
	for (var i = 0, elem; elem = buttons[i]; i++) {
		elem.disabled = a;
	}
}