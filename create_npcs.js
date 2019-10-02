function launchNPCForm() {
    hideElement("edit-menu");
    showElement("npc-form");
    showElement("npc-create-buttons");
    hideElement("npc-edit-buttons");
    disableEditingButtons();
}

function clearNPCForm() {
    $("npc-monster-name").value = "";
	$("npc-race").value = "";
	$("npc-hit-points").value = "";
	$("npc-hit-dice").value = "";
	$("npc-modifier").value = "";
	$("npc-dexterity").value = "";
	$("npc-passive-perception").value = "";
	$("npc-page-number").value = "";
	$("npc-d4").checked = false;
	$("npc-d6").checked = false;
	$("npc-d8").checked = false;
	$("npc-d10").checked = false;
	$("npc-d12").checked = false;
	$("npc-d20").checked = false;
}

function npcFormHasData() {
    if (($("npc-monster-name").value != "") ||
		($("npc-race").value != "") ||
		($("npc-hit-points").value != "") ||
		($("npc-hit-dice").value != "") ||
		($("npc-modifier").value != "") ||
		($("npc-dexterity").value != "") ||
		($("npc-passive-perception").value != "") ||
		($("npc-page-number").value != "") ||
		$("npc-d4").checked ||
		$("npc-d6").checked ||
		$("npc-d8").checked ||
		$("npc-d10").checked ||
		$("npc-d12").checked ||
		$("npc-d20").checked) {
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
		if ($("npc-hit-points").value == "") {
			if ($("npc-hit-dice").value == "") {
				alert("NPC must have total hit points or hit dice specified.");
				return false;
			}
			else {
				if (!$("npc-d4").checked) {
					if (!$("npc-d6").checked) {
						if (!$("npc-d8").checked) {
							if (!$("npc-d10").checked) {
							    if (!$("npc-d12").checked) {
									if (!$("npc-d20").checked) {
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
        var character = new NPC($("npc-monster-name").value,
                                $("npc-race").value,
                                $("npc-passive-perception").value,
                                $("npc-dexterity").value,
                                $("npc-hit-points").value,
                                $("npc-hit-dice").value,
                                $("npc-modifier").value,
                                $("npc-page-number").value,
                                $("npc-d4").checked,
                                $("npc-d6").checked,
                                $("npc-d8").checked,
                                $("npc-d10").checked,
                                $("npc-d12").checked,
                                $("npc-d20").checked);
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
    $("npc-legend-form").innerHTML = "Edit NPC";
	showElement("npc-form");
	showElement("npc-edit-buttons");
    hideElement("npc-create-buttons");
    $("npc-monster-name").value = characters[npcEdit].name;
    $("npc-race").value = characters[npcEdit].race;
    $("npc-passive-perception").value = characters[npcEdit].passivePerception;
    $("npc-dexterity").value = characters[npcEdit].dexterity;
    $("npc-hit-points").value = characters[npcEdit].hitPoints;
    $("npc-hit-dice").value = characters[npcEdit].numOfHitDice;
    $("npc-modifier").value = characters[npcEdit].hpModifier;
    $("npc-page-number").value = characters[npcEdit].pageNumber;
    if (!characters[npcEdit].constHP) {
        if (characters[npcEdit].hitDice == 4) {
            $("npc-d4").checked = true;
        }
        else {
            if (characters[npcEdit].hitDice == 6) {
                $("npc-d6").checked = true;
            }
            else {
                if (characters[npcEdit].hitDice == 8) {
                    $("npc-d8").checked = true;
                }
                else {
                    if (characters[npcEdit].hitDice == 10) {
                        $("npc-d10").checked = true;
                    }
                    else {
                        if (characters[npcEdit].hitDice == 12) {
                            $("npc-d12").checked = true;
                        }
                        else {
                            if (characters[npcEdit].hitDice == 20) {
                                $("npc-d20").checked = true;
                            }
                        }
                    }
                }
            }
        }
    }
}