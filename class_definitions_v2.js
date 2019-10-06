class Character {
    constructor(pc, name, race, characterClass, ac, passivePerception, dexterity, hitPoints,
        hitDice, d4, d6, d8, d10, d12, d20, hpModifier, pageNumber) {
            this.pc = pc;
            //this.unique = unique;
            this.name = name;
            this.race = race;
            this.characterClass = characterClass;
            this.armorClass = ac;
		    this.passivePerception = passivePerception;
            this.dexterity = dexterity;
            this.hitPoints = hitPoints;
            this.hitDice = hitDice;
            this.d4 = d4;
		    this.d6 = d6;
		    this.d8 = d8;
		    this.d10 = d10;
		    this.d12 = d12;
            this.d20 = d20;
            this.hpModifier = hpModifier;
            this.pageNumber = pageNumber;
            this.formID = "";
            this.setUniqueness()
    }

    setUniqueness() {
        if (this.pc) {
            this.unique = true;
        }
        else {
            if (this.name != "") {
                this.unique = true;
            }
            else {
                this.unique = false;
            }
        }
    }

    changeName(v) {
        this.name = v;
        if (this.name != "") {
            this.unique = true;
        }
        else {
            this.unique = false;
        }
    }

    changeRace(v) {
        this.race = v;
    }

    changeCharacterClass(v) {
        this.characterClass = v;
    }

    changeArmorClass(v) {
        this.armorClass = v;
    }

    changePassivePerception(v) {
        this.passivePerception = v;
    }

    changeDexterity(v) {
        this.dexterity = v;
    }

    changeHitPoints(v) {
        this.hitPoints = v;
    }

    changeHitDice(hitDice, d4, d6, d8, d10, d12, d20) {
        this.d4 = d4;
		this.d6 = d6;
	    this.d8 = d8;
	    this.d10 = d10;
    	this.d12 = d12;
        this.d20 = d20;
        this.hitDice = hitDice;
    }

    changeHPModifier(v) {
        this.hpModifier = v;
    }

    changePageNumber(v) {
        this.pageNumber = v;
    }

    editValuesInCharacterTable(i) {
		if (this.unique) {
			$("character-button-".concat(i)).innerHTML = "*".concat(this.name);
		}
		else {
			$("character-button-".concat(i)).innerHTML = this.race;
        }
        $("character-passive-perception-".concat(i)).innerHTML = "PP: ".concat(this.passivePerception);
        $("character-armor-class-".concat(i)).innerHTML = "AC: ".concat(this.armorClass);
	}

    initializeRandomizedVars() {
        this.hitPoints_C = Number(this.hitPoints);
        this.hitDice_C = Number(this.hitDice);
        this.hpModifier_C = Number(this.hpModifier);
        this.dexterity_C = Number(this.dexterity);
        if (this.d4) {
			this.usableHitDice_C = 4;
			this.formID = "npc-d4";
		}
		else if (this.d6) {
			this.usableHitDice_C = 6;
			this.formID = "npc-d6";
		}
		else if (this.d8) {
			this.usableHitDice_C = 8;
			this.formID = "npc-d8";
		}
		else if (this.d10) {
			this.usableHitDice_C = 10;
			this.formID = "npc-d10";
		}
		else if (this.d12) {
			this.usableHitDice_C = 12;
			this.formID = "npc-d12";
		}
		else if (this.d20) {
			this.usableHitDice_C = 20;
			this.formID = "npc-d20";
		}
    }
}