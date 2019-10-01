function launchPCForm() {
    hideElement("edit-menu");
    showElement("pc-form");
    showElement("pc-create-buttons");
    hideElement("pc-edit-buttons");
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
	showElement("manager-menu");
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
		//function addCharacterToColumn(unique, name, race, passivePerception, i)
		addCharacterToColumn(true, character.name, character.race, character.passivePerception, characters.length - 1);
        //document.getElementById("right-container").style.display = "block";
        //addCharacterToColumn(character, characters.length - 1);
        clearPCForm();
    }
}