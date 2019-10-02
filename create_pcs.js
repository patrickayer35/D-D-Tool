function launchPCForm() {
    hideElement("edit-menu");
    showElement("pc-form");
    showElement("pc-create-buttons");
	hideElement("pc-edit-buttons");
	disableEditingButtons();
}

function clearPCForm() {
    document.getElementById("pc-character-name").value = "";
	document.getElementById("pc-race").value = "";
	document.getElementById("pc-class").value = "";
	document.getElementById("pc-passive-perception").value = ""
	document.getElementById("pc-dexterity").value = "";
	document.getElementById("pc-hit-points").value = "";
}

function pcFormHasData() {
	if ((document.getElementById("pc-character-name").value != "") ||
		(document.getElementById("pc-race").value != "") ||
		(document.getElementById("pc-class").value != "") ||
		(document.getElementById("pc-passive-perception").value != "") ||
		(document.getElementById("pc-dexterity").value != "") ||
		(document.getElementById("pc-hit-points").value != "")) {
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

function validateFormField(e, alertMssg) {
    if (document.getElementById(e).value == "") {
        alert(alertMssg);
		return false;
	}
	else {
		return true;
	}
}

function validatePCFormComplete() {
	if (validateFormField("pc-character-name", "PC must have a name.")) {
	    if (validateFormField("pc-race", "PC must have a race.")) {
			if (validateFormField("pc-class", "PC must have a class.")) {
				if (validateFormField("pc-passive-perception", "PC must have a passive perception.")) {
					if (validateFormField("pc-dexterity", "PC must have a dexterity modifier.")) {
						if (validateFormField("pc-hit-points", "PC must have hit points.")) {
							return true;
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
        var character = new PC(document.getElementById("pc-character-name").value,
                               document.getElementById("pc-race").value,
                               document.getElementById("pc-passive-perception").value,
                               document.getElementById("pc-dexterity").value,
                               document.getElementById("pc-hit-points").value,
                               document.getElementById("pc-class").value);
		characters.push(character);
		showElement("right-container");
        showElement("edit-menu");
		hideElement("pc-form");
		addCharacterToColumn(true, character.name, character.race, character.passivePerception, characters.length - 1);
		enableEditingButtons();
        clearPCForm();
    }
}

function launchPCEditForm() {
	document.getElementById("pc-legend-form").innerHTML = "Edit PC";
	showElement("pc-form");
	showElement("pc-edit-buttons");
	hideElement("pc-create-buttons");
	document.getElementById("pc-character-name").value = characters[pcEdit].name;
	document.getElementById("pc-race").value = characters[pcEdit].race;
	document.getElementById("pc-passive-perception").value = characters[pcEdit].passivePerception;
    document.getElementById("pc-dexterity").value = characters[pcEdit].dexterity;
    document.getElementById("pc-hit-points").value = characters[pcEdit].hitPoints;
	document.getElementById("pc-class").value = characters[pcEdit].characterClass;
}