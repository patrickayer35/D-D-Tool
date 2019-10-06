function $ (i) {
	return document.getElementById(i);
}

function showElement(e) {
	$(e).style.display = "block";
}

function hideElement(e) {
	$(e).style.display = "none";
}

function startNewSession() {
	hideElement("start-container");
	showElement("manager-menu");
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
	bindSaveSessionButton();
}

function validateFormField(e, alertMssg) {
    if ($(e).value == "") {
        alert(alertMssg);
		return false;
	}
	else {
		return true;
	}
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
	input.addEventListener("click", function () { bindCharacterToEncounterButton(i) }, false);
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

	var table = $("character-list-table");
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

function bindCharacterToEncounterButton(i) {
	var table = $("encounter-setup-table");
	var tr = document.createElement("tr");
	tr.className = "encounter-setup-row";
	tr.id = "encounter-setup-row-".concat(i);
	table.appendChild(tr);

	td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	p.className = "encounter-setup-character-field";
	p.id = i;
	p.style = "width:150px;";
	if (characters[i].unique) {
		p.innerHTML = "*".concat(characters[Number(i)].name);
	}
	else {
		p.innerHTML = characters[Number(i)].race;
	}
	td.appendChild(p);

	td = document.createElement("td");
	tr.appendChild(td);

	var btn = document.createElement("button");
	btn.type = "button";
	btn.className = "remove-from-encounter-startup";
	btn.id = "remove-from-encounter-startup-".concat(i);
	btn.innerHTML = "X Remove";
	btn.addEventListener("click", function() {removeFromPreEncounter(i)}, false);
	td.appendChild(btn);

	td = document.createElement("td");
	tr.appendChild(td);

	var field = document.createElement("input");
	field.type = "text";
	field.id = "initiative-input-".concat(i);
	if (characters[Number(i)].unique) {
		field.className = "initiative-input";
		field.placeholder = "Initiative required.";
	}
	else {
		field.className = "npcs-count";
		field.placeholder = "How many?";
	}
	td.appendChild(field);
	$("character-button-".concat(i)).disabled = true;
}

function removeFromPreEncounter(i) {
	var c = confirm("Are you sure you want to remove this character from the encounter?");
	if (c) {
		var row = $("encounter-setup-row-".concat(i));
		$("encounter-setup-table").deleteRow(row.rowIndex);
		$("character-button-".concat(i)).disabled = false;
	}
}

function bindEditButton(i) {
	disableEditingButtons();
	hideElement("edit-menu");
	if (characters[i].pc) {
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
		var row = $("character-row-".concat(i));
		delete characters[Number(i)];
		$("character-list-table").deleteRow(row.rowIndex);
		if ($("character-list-table").rows.length == 0) {
			$("right-container").style.display = "none";
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
	var rows = $(tableId).rows.length;
	for (var i = rows - 1; i >= 0; i--) {
		$(tableId).deleteRow(i);
	}
}

function startNewEncounter() {
	if (characters.length < 2) {
		alert("You need at least 2 characters to begin an encounter.")
	}
	else {
		disableEditingButtons();
		disableEnableButtons("character-btn");
		hideElement("manager-menu");
		showElement("encounter-setup");
	}
}

function startEncounter() {
	if (verifyAllUniqueInitiatives() && verifyAllNPCCounts()) {

	}
}

function verifyAllUniqueInitiatives() {
	var initiatives = document.getElementsByClassName("initiative-input");
	var totalUniques = initiatives.length;
	for (var i = 0; i < totalUniques; i++) {
		if (initiatives[i].value == "") {
			alert("All unique characters must have an initiative.");
			return false;
		}
	}
	return true;
}

function verifyAllNPCCounts() {
	var counts = document.getElementsByClassName("npcs-count");
	var totalNPCs = counts.length;
	for (var i = 0; i < totalNPCs; i++) {
		if (counts[i].value == "") {
			alert("You must provide the number for all NPCs.");
			return false;
		}
	}
	return true;
}

function cancelEncounter() {
	if ($("encounter-setup-table").rows.length > 0) {
		var c = confirm("Are you sure you want to cancel this encounter?");
		if (!c) {
			return;
		}
	}
	deleteAllTableRows("encounter-setup-table");
	disableEnableButtons("character-btn", true);
	hideElement("encounter-setup");
	showElement("manager-menu");
}

function bindSaveSessionButton() {
	var s = $("save-session");
	s.addEventListener("click", function() {
		var characters_clean = [];
		var l = characters.length;
		for (var i = 0; i < l; i++) {
			if (characters[i] != null) {
				characters_clean.push(characters[i]);
			}
		}
		download("data = ".concat(JSON.stringify(characters_clean)), "session_data.json", "text/plain");
	}, false);
}

function download(content, fileName, contentType) {
	var a = document.createElement("a");
	var file = new Blob([content], {type: contentType});
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}


function loadPreviousSession() {
	hideElement("start-container");
	showElement("manager-menu");
	$("right-container").style.display = "block";
	for (var i = 0, d; d = data[i]; i++) {
		/*
		constructor(pc, name, race, characterClass, passivePerception, dexterity, hitPoints,
        hitDice, d4, d6, d8, d10, d12, d20, hpModifier, pageNumber)
		*/
		var c = new Character(d.pc, d.name, d.race, d.characterClass, d.passivePerception, d.dexterity, d.hitPoints,
							  d.hitDice, d.d4, d.d6, d.d8, d.d10, d.d12, d.d20, d.hpModifier, d.pageNumber);
		if (!c.pc) {
			c.initializeRandomizedVars();
		}
		characters.push(c);
		addCharacterToColumn(c.unique, c.name, c.race, c.passivePerception, characters.length - 1);
	}
	disableEditingButtons();
}