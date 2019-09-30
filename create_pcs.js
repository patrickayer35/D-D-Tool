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
        showElement("manager-menu");
        hideElement("pc-form");
        //document.getElementById("right-container").style.display = "block";
        //addCharacterToColumn(character, characters.length - 1);
        clearPCForm();
    }
}

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