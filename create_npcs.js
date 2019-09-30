function launchNPCForm() {
    hideElement("edit-menu");
    showElement("npc-form");
    showElement("npc-create-buttons");
    hideElement("npc-edit-buttons");
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