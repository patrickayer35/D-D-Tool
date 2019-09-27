function showElement(e) {
	document.getElementById(e).style.display = "block";
}

function hideElement(e) {
	document.getElementById(e).style.display = "none";
}

function startNewSession() {
	hideElement("start-container");
	showElement("manager-menu");
}

function loadPreviousSession() {
    // do something
}

function editSession() {
    hideElement("manager-menu");
    showElement("edit-menu");
}

function launchPCForm() {
    hideElement("edit-menu");
    showElement("pc-form");
    showElement("pc-create-buttons");
    hideElement("pc-edit-buttons");
}

function launchNPCForm() {
    hideElement("edit-menu");
    showElement("npc-form");
    showElement("npc-create-buttons");
    hideElement("npc-edit-buttons");
}

function hideCharacterForms() {
	document.getElementById("pc-form").style.display = "none";
	document.getElementById("npc-form").style.display = "none";
}
/*
function editSession() {
	hideElement("mid-session-buttons");
	showElement("edit-session-buttons");
	disableEnableButtons("dynamic-button character-name-btn", true);
	disableEnableButtons("dynamic-button delete-from-manager-btn", false);
	disableEnableButtons("dynamic-button edit-character", false);
}
*/

function backToHome() {
	if (characters.length > 0 || partiallyFilledPCForm() || partiallyFilledNPCForm()) {
		var c = confirm("Returning to startup will delete any unsaved data. Continue?");
		if (c) {
			characters = [];
			clearPCForm();
			clearNPCForm();
			deleteAllTableRows("character-list-table");
			hideElement('character-list-container');
			characters = [];
		}
	}
	hideCharacterForms();
	hideElement("mid-session-buttons");
	showElement("startup-buttons");
	//hideElement("mid-session-buttons");
	//showElement("startup-buttons");
	//hideElement("character-list-header");
	//hideElement("edit-current-session-buttons");
	//hideElement("running-the-session-buttons");
	//showElement("startup-buttons");
}

function showCharacterForm(e) {
	hideElement("edit-session-buttons");
	showElement(e);
}

function showNPCHelpGuide(e) {
	showElement("npc-form-help-guide");
	hideElement(e);
}

function doneEditing() {
	hideElement("edit-session-buttons");
	showElement("mid-session-buttons");
	disableEnableButtons("dynamic-button delete-from-manager-btn", true);
	disableEnableButtons("dynamic-button edit-character", true);
	//doneAddingCharacters();
}

function disableEnableButtons(btnClass, a) {
	var buttons = document.getElementsByClassName(btnClass);
	for (var i = 0, elem; elem = buttons[i]; i++) {
		elem.disabled = a;
	}
}