function launchPCForm() {
    hideElement("edit-menu");
    showElement("pc-form");
    showElement("pc-create-buttons");
	hideElement("pc-edit-buttons");
	disableEditingButtons();
}

function clearPCForm() {
    $("pc-character-name").value = "";
	$("pc-race").value = "";
	$("pc-class").value = "";
	$("pc-armor-class").value = "";
	$("pc-passive-perception").value = "";
	$("pc-dexterity").value = "";
	$("pc-hit-points").value = "";
}

function pcFormHasData() {
	if (($("pc-character-name").value != "") ||
		($("pc-race").value != "") ||
		($("pc-class").value != "") ||
		($("pc-armor-class").value != "") ||
		($("pc-passive-perception").value != "") ||
		($("pc-dexterity").value != "") ||
		($("pc-hit-points").value != "")) {
		return true;
	}
	else {
		return false;
	}
}

function clearPCFormConfirm() {
	if (pcFormHasData()) {
		var c = confirm("Going back will delete any unsaved data. Continue?");
		if (c) {
			clearPCForm();
		}
		else {
			return;
		}
	}
	hideElement("pc-form");
	showElement("edit-menu");
	enableEditingButtons();
}

function validatePCFormComplete() {
	if (validateFormField("pc-character-name", "PC must have a name.")) {
	    if (validateFormField("pc-race", "PC must have a race.")) {
			if (validateFormField("pc-class", "PC must have a class.")) {
				if (validateFormField("pc-passive-perception", "PC must have a passive perception.")) {
					if (validateFormField("pc-armor-class", "PC must have an armor class.")) {
						if (validateFormField("pc-dexterity", "PC must have a dexterity modifier.")) {
							if (validateFormField("pc-hit-points", "PC must have hit points.")) {
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}

function createPC() {
	if (validatePCFormComplete()) {
		/*
		constructor(pc, unique, name, race, characterClass, passivePerception, dexterity, hitPoints,
        hitDice, d4, d6, d8, d10, d12, d20, hpModifier, pageNumber)
		*/
		var c = new Character(true, $("pc-character-name").value, $("pc-race").value, $("pc-class").value, $("pc-armor-class").value,
					   		  $("pc-passive-perception").value, $("pc-dexterity").value, $("pc-hit-points").value,
					   		  "", false, false, false, false, false, false, "", "");
		characters.push(c);
		showElement("right-container");
        showElement("edit-menu");
		hideElement("pc-form");
		addCharacterToColumn(true, c.name, c.race, c.passivePerception, c.armorClass, characters.length - 1);
		enableEditingButtons();
        clearPCForm();
	}
}

function launchPCEditForm() {
	$("pc-legend-form").innerHTML = "Edit PC";
	showElement("pc-form");
	showElement("pc-edit-buttons");
	hideElement("pc-create-buttons");
	$("pc-character-name").value = characters[pcEdit].name;
	$("pc-race").value = characters[pcEdit].race;
	$("pc-armor-class").value = characters[pcEdit].armorClass;
	$("pc-passive-perception").value = characters[pcEdit].passivePerception;
    $("pc-dexterity").value = characters[pcEdit].dexterity;
    $("pc-hit-points").value = characters[pcEdit].hitPoints;
	$("pc-class").value = characters[pcEdit].characterClass;
}

function editPC() {
	if (validatePCFormComplete()) {
		characters[pcEdit].changeName($("pc-character-name").value);
		characters[pcEdit].changeRace($("pc-race").value);
		characters[pcEdit].changeArmorClass($("pc-armor-class").value);
		characters[pcEdit].changePassivePerception($("pc-passive-perception").value);
		characters[pcEdit].changeDexterity($("pc-dexterity").value);
		characters[pcEdit].changeHitPoints($("pc-hit-points").value);
		characters[pcEdit].changeCharacterClass($("pc-class").value);
		hideElement("pc-form");
		$("pc-legend-form").innerHTML = "Create PC";
		showElement("edit-menu")
		hideElement("pc-edit-buttons");
		showElement("pc-create-buttons");
		characters[pcEdit].editValuesInCharacterTable(pcEdit);
		pcEdit = null;
		enableEditingButtons();
		clearPCForm();
	}
}