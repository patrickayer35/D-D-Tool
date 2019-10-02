function launchNPCForm() {
    hideElement("edit-menu");
    showElement("npc-form");
    showElement("npc-create-buttons");
    hideElement("npc-edit-buttons");
    disableEditingButtons();
}

function clearNPCForm() {
    document.getElementById("npc-monster-name").value = "";
	document.getElementById("npc-race").value = "";
	document.getElementById("npc-hit-points").value = "";
	document.getElementById("npc-hit-dice").value = "";
	document.getElementById("npc-modifier").value = "";
	document.getElementById("npc-dexterity").value = "";
	document.getElementById("npc-passive-perception").value = "";
	document.getElementById("npc-page-number").value = "";
	document.getElementById("npc-d4").checked = false;
	document.getElementById("npc-d6").checked = false;
	document.getElementById("npc-d8").checked = false;
	document.getElementById("npc-d10").checked = false;
	document.getElementById("npc-d12").checked = false;
	document.getElementById("npc-d20").checked = false;
}

function npcFormHasData() {
    if ((document.getElementById("npc-monster-name").value != "") ||
		(document.getElementById("npc-race").value != "") ||
		(document.getElementById("npc-hit-points").value != "") ||
		(document.getElementById("npc-hit-dice").value != "") ||
		(document.getElementById("npc-modifier").value != "") ||
		(document.getElementById("npc-dexterity").value != "") ||
		(document.getElementById("npc-passive-perception").value != "") ||
		(document.getElementById("npc-page-number").value != "") ||
		document.getElementById("npc-d4").checked ||
		document.getElementById("npc-d6").checked ||
		document.getElementById("npc-d8").checked ||
		document.getElementById("npc-d10").checked ||
		document.getElementById("npc-d12").checked ||
		document.getElementById("npc-d20").checked) {
		return true;
	}
	else {
		return false;
	}
}

function clearNPCFormConfirm() {
	if (npcFormHasData()) {
		var c = confirm("Going back will delete any unsaved data. Continue?");
		if (c) {
			clearNPCForm();
		}
		else {
			return;
		}
	}
	hideElement("npc-form");
    showElement("edit-menu");
    enableEditingButtons();
}

function validateNPCFormComplete() {
	if (validateFormField("npc-race", "NPC must have a race.")) {
		if (document.getElementById("npc-hit-points").value == "") {
			if (document.getElementById("npc-hit-dice").value == "") {
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
			if (validateFormField("npc-page-number", "NPC must have a page number, or 0.")) {
				if (validateFormField("npc-passive-perception", "NPC must have a passive perception, or 0.")) {
					return true;
				}
			}
		}
	}
	return false;
}
//constructor(name, race, passivePerception, dexterity, hitPoints, numOfHitDice, hpModifier, pageNumber, d4, d6, d8, d10, d12, d20)
function createNPC() {
    if (validateNPCFormComplete()) {
        var character = new NPC(document.getElementById("npc-monster-name").value,
                                document.getElementById("npc-race").value,
                                document.getElementById("npc-passive-perception").value,
                                document.getElementById("npc-dexterity").value,
                                document.getElementById("npc-hit-points").value,
                                document.getElementById("npc-hit-dice").value,
                                document.getElementById("npc-modifier").value,
                                document.getElementById("npc-page-number").value,
                                document.getElementById("npc-d4").checked,
                                document.getElementById("npc-d6").checked,
                                document.getElementById("npc-d8").checked,
                                document.getElementById("npc-d10").checked,
                                document.getElementById("npc-d12").checked,
                                document.getElementById("npc-d20").checked);
        characters.push(character);
        showElement("right-container");
        showElement("edit-menu");
        hideElement("npc-form");
        addCharacterToColumn(character.unique, character.name, character.race, character.passivePerception, characters.length - 1);
        enableEditingButtons();
        clearNPCForm();
    }
}

// constructor(name, race, passivePerception, dexterity, hitPoints, numOfHitDice, hpModifier, pageNumber, d4, d6, d8, d10, d12, d20)

function launchNPCEditForm() {
    document.getElementById("npc-legend-form").innerHTML = "Edit NPC";
	showElement("npc-form");
	showElement("npc-edit-buttons");
    hideElement("npc-create-buttons");
    document.getElementById("npc-monster-name").value = characters[npcEdit].name;
    document.getElementById("npc-race").value = characters[npcEdit].race;
    document.getElementById("npc-passive-perception").value = characters[npcEdit].passivePerception;
    document.getElementById("npc-dexterity").value = characters[npcEdit].dexterity;
    document.getElementById("npc-hit-points").value = characters[npcEdit].hitPoints;
    document.getElementById("npc-hit-dice").value = characters[npcEdit].numOfHitDice;
    document.getElementById("npc-modifier").value = characters[npcEdit].hpModifier;
    document.getElementById("npc-page-number").value = characters[npcEdit].pageNumber;
    if (!characters[npcEdit].constHP) {
        if (characters[npcEdit].hitDice == 4) {
            document.getElementById("npc-d4").checked = true;
        }
        else {
            if (characters[npcEdit].hitDice == 6) {
                document.getElementById("npc-d6").checked = true;
            }
            else {
                if (characters[npcEdit].hitDice == 8) {
                    document.getElementById("npc-d8").checked = true;
                }
                else {
                    if (characters[npcEdit].hitDice == 10) {
                        document.getElementById("npc-d10").checked = true;
                    }
                    else {
                        if (characters[npcEdit].hitDice == 12) {
                            document.getElementById("npc-d12").checked = true;
                        }
                        else {
                            if (characters[npcEdit].hitDice == 20) {
                                document.getElementById("npc-d20").checked = true;
                            }
                        }
                    }
                }
            }
        }
    }
}