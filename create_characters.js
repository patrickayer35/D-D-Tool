function clearPCForm() {
    document.getElementById("pc-character-name").value = "";
	document.getElementById("pc-race").value = "";
	document.getElementById("pc-class").value = "";
	document.getElementById("pc-passive-perception").value = ""
	document.getElementById("pc-dexterity").value = "";
	document.getElementById("pc-hit-points").value = "";
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

function validateNPCFormComplete() {
	if (validateFormField("npc-race", "NPC must have a race.")) {
		if (document.getElementById("npc-hp").value == "") {
			if (document.getElementById("npc-hitDice").value == "") {
				alert("NPC must have total hit points or hit dice specified.");
				return false;
			}
			else {
				if (!document.getElementById("npc-d4").checked) {
					if (!document.getElementById("npc-d6").checked) {
						if (!document.getElementById("npc-d8").checked) {
							if (!document.getElementById("npc-d10").checked) {
							    if (!document.getElementById("npc-d12").checked) {
									if (!document.getElementById("npc-d20").checked) {
										alert("You must check a hit dice option.");
										return false
									}
								}
							}
						}
					}
				}
				if (!validateFormField("npc-modifier", "NPC must have a hit point modifier, or 0.")) {
					return false;
				}
			}
		}
		if (validateFormField("npc-dexterity", "NPC must have a dexterity modifier.")) {
			if (validateFormField("npc-pageNo", "NPC must have a page number, or 0.")) {
				if (validateFormField("npc-passive-perception", "NPC must have a passive perception, or 0.")) {
					return true;
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
        clearPCForm();
    }
}