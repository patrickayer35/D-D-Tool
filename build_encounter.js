function bindCharacterToEncounterButton(i) {
	var table = $("encounter-setup-table");
	var tr = document.createElement("tr");
	tr.className = "encounterSetup__row";
	tr.id = "encounter-setup-row-".concat(i);
	table.appendChild(tr);

	td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	p.className = "encounterSetup__characterDisplay";
	p.id = "encounter-setup-character-field".concat(i);
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
	btn.className = "encounterSetup__removeButton";
	btn.id = "remove-from-encounter-startup-".concat(i);
	btn.innerHTML = "X Remove";
	btn.addEventListener("click", function() {removeFromPreEncounter(i)}, false);
	td.appendChild(btn);

	td = document.createElement("td");
	tr.appendChild(td);

	var field = document.createElement("input");
	field.type = "number";
	field.id = "initiative-input-".concat(i);
	if (characters[Number(i)].unique) {
		field.className = "encounterSetup__inputField js-encounterSetup__initiative";
		field.placeholder = "Initiative required.";
	}
	else {
		field.className = "encounterSetup__inputField js-encounterSetup__npcsCount";
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

function startNewEncounter() {
	var trueChar = 0;
	var fullArray = characters.length
	for (var i  = 0; i < fullArray; i++) {
		if (characters[i] != null) {
			trueChar += 1;
		}
	}
	if (trueChar < 2) {
		alert("You need at least 2 characters to begin an encounter.")
	}
	else {
		disableEditingButtons();
		disableEnableButtons("characterListColumn__characterButton");
		hideElement("manager-menu");
		showElement("encounter-setup");
	}
}

function startEncounter() {
	if (encounterIsValid()) {
		hideElement("right-container");
		hideElement("encounter-setup");
		showElement("encounter-menu");
		var combatants = sortCombatants();
		var numOfCombatants = combatants.length;
		for (var n = 0; n < numOfCombatants; n++) {
			addCombatantToEncounterOrder(combatants[n]);
		}
		deleteAllTableRows("encounter-setup-table");
	}
}

function encounterIsValid() {
	var rows = $("encounter-setup-table").rows.length;
	if (rows < 2) {
		alert("You must add at least 2 characters to the encounter.");
		return false;
	}
	return verifyAllUniqueInitiatives() && verifyAllNPCCounts();
}

function verifyAllUniqueInitiatives() {
	var initiatives = document.getElementsByClassName("js-encounterSetup__initiative");
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
	var counts = document.getElementsByClassName("js-encounterSetup__npcsCount");
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
	disableEnableButtons("characterListColumn__characterButton", true);
	hideElement("encounter-setup");
	showElement("manager-menu");
}

function sortCombatants() {
	var combatants = [];
	var table = $("encounter-setup-table");
	var rowCount = table.rows.length;
	for (var r = 0; r < rowCount; r++) {
		var splitIDs = table.rows[r].id.split("-");
		characterIndex = Number(splitIDs[3]);
		if (table.rows[r].cells[2].firstChild.getAttribute("class") == "encounterSetup__inputField js-encounterSetup__npcsCount") {
			var numOfNPCs = Number(table.rows[r].cells[2].firstChild.value);
			for (var n = 0; n < numOfNPCs; n++) {
				combatants.push( {obj_id : characterIndex,
								  obj_label : characters[characterIndex].race,
								  obj_hitPoints : characters[characterIndex].randomizeHitPoints(),
								  obj_initiative : characters[characterIndex].rollInitiative(),
								  obj_dexterity : Number(characters[characterIndex].dexterity)} );
			}
		}
		else {
			combatants.push( {obj_id : characterIndex,
							  obj_label : "*".concat(characters[characterIndex].name),
							  obj_hitPoints : Number(characters[characterIndex].hitPoints),
							  obj_initiative : Number(table.rows[r].cells[2].firstChild.value),
							  obj_dexterity : Number(characters[characterIndex].dexterity)} );
		}
	}
	return combatants.sort(compare);
}

function compare(a, b) {
	if (a.obj_initiative > b.obj_initiative) {
		return -1;
	}
	else if (a.obj_initiative < b.obj_initiative) {
		return 1;
	}
	else { // initative rolls were the same
		if (a.obj_dexterity > b.obj_dexterity) {
			return -1;
		}
		else if (a.obj_dexterity < b.obj_dexterity) {
			return 1;
		}
		else { // initative and dexterity rolls are the same
			if (characters[a.obj_id].pc && !characters[b.obj_id].pc) {
				return -1;
			}
			else if (!characters[a.obj_id].pc && characters[b.obj_id].pc) {
				return 1;
			}
			else if (characters[a.obj_id].pc && characters[b.obj_id].pc) {
				return -1;
			}
			else if (!characters[a.obj_id].pc && !characters[b.obj_id].pc) {
				return -1;
			}
			else {
				return 0;
			}
		}
	}
}

function addCombatantToEncounterOrder(c) {

	var tbody = $("encounter-order");
	var tr = document.createElement("tr");
	tr.className = "encounterOrder__row";
	//tr.id = "encounter-order-row-".concat(c.obj_id);
	tbody.appendChild(tr);

	var td = document.createElement("td");
	tr.appendChild(td);

	var field = document.createElement("input");
	field.type = "text";
	field.className = "encounterOrder__conditionsNotes";
	td.appendChild(field);

	var td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	p.innerHTML = c.obj_label;
	p.className = "encounterOrder__characterLabel";
	td.appendChild(p);

	var td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	p.innerHTML = c.obj_initiative;
	p.className = "encounterOrder__initiative";
	td.appendChild(p);

	var td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	p.innerHTML = c.obj_hitPoints;
	p.className = "encounterOrder__hitPoints";
	p.id = c.obj_id;
	td.appendChild(p);

	var td = document.createElement("td");
	tr.appendChild(td);

	var p = document.createElement("p");
	characters[c.obj_id].pc ? p.innerHTML = "---" : p.innerHTML = characters[c.obj_id].pageNumber;
	p.className = "encounterOrder__pageNumber";
	td.appendChild(p);

	var td = document.createElement("td");
	tr.appendChild(td);

	var field = document.createElement("input");
	field.type = "number";
	field.className = "encounterOrder__changeHitPoints";
	field.placeholder = "Change HP"
	td.appendChild(field);

	var td = document.createElement("td");
	tr.appendChild(td);

	var btn = document.createElement("button");
	btn.type = "button";
	btn.className = "encounterOrder__subtractHitPointsButton";
	btn.id = "subtract-hit-points-btn-".concat(c.obj_id);
	btn.innerHTML = "Subtract HP";
	btn.style = "width: 130px";
	btn.addEventListener("click", function() {bindSubtractHPButton(this)}, false);
	td.appendChild(btn);
}

function bindSubtractHPButton(elem) {
	var subtractField = elem.parentNode.previousSibling.firstChild;
	if (subtractField.value == "") {
		alert("Value required.");
	}
	else {
		var subtractHP = Number(subtractField.value);
		var hpContainer = elem.parentNode.previousSibling.previousSibling.previousSibling.firstChild;
		//console.log(hpContainer);
		var currentHP = Number(hpContainer.innerHTML);
		hpContainer.innerHTML = currentHP - subtractHP;
		subtractField.value = "";
	}
}

function endEncounter() {
	var c = confirm("Are you sure? This encounter will be lost.")
	if (c) {
		alterUniquesHP();
		deleteAllTableRows("encounter-order");
		hideElement("encounter-menu");
		disableEnableButtons("characterListColumn__characterButton", true);
		showElement("right-container");
		showElement("manager-menu");

	}
}

function alterUniquesHP() {
	var hpValues = document.getElementsByClassName("encounterOrder__changeHitPoints");
	var totalValues = hpValues.length;
	for (var i = 0; i < totalValues; i++) {
		if (characters[Number(hpValues[i].getAttribute("id"))].unique) {
			characters[Number(hpValues[i].getAttribute("id"))].changeHitPoints(Number(hpValues[i].innerHTML));
		}
	}
}