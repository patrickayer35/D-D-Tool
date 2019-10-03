class Character {
	constructor(name, race, passivePerception, dexterity, hitPoints) {
		this.name = name;
		this.race = race;
		this.passivePerception = Number(passivePerception);
		this.dexterity = Number(dexterity);
		this.hitPoints = Number(hitPoints);
	}

	changeName(value) {
		this.name = value;
	}

	changeRace(value) {
		this.race = value;
	}

	changePassivePerception(value) {
		this.passivePerception = Number(value);
	}

	changeDexterity(value) {
		this.dexterity = Number(value);
	}

	changeHP(value) {
		this.hitPoints = Number(value);
	}

	editValuesInCharacterTable(i) {
		if (this.unique) {
			$("character-button-".concat(i)).innerHTML = "*".concat(this.name);
		}
		else {
			$("character-button-".concat(i)).innerHTML = this.race;
		}
		$("character-passive-perception-".concat(i)).innerHTML = "PP: ".concat(this.passivePerception);
	}
}

class PC extends Character {
	constructor(name, race, passivePerception, dexterity, hitPoints, characterClass) {
		super(name, race, passivePerception, dexterity, hitPoints);
		this.characterClass = characterClass;
		this.unique = true;
	}

	changeCharacterClass(value) {
		this.characterClass = value;
	}
}

class NPC extends Character {
	constructor(name, race, passivePerception, dexterity, hitPoints,
				numOfHitDice, hpModifier, pageNumber, d4, d6, d8, d10, d12, d20) {
		super(name, race, passivePerception, dexterity, hitPoints);
		this.pageNumber = Number(pageNumber);
		this.setHPVars(numOfHitDice, hpModifier, d4, d6, d8, d10, d12, d20);
        this.setUniqueness();
	}

	setHPVars(numOfHitDice, hpModifier, d4, d6, d8, d10, d12, d20) {
		if (numOfHitDice == "") {
			this.numOfHitDice = numOfHitDice;
			this.hpModifier = hpModifier;
			this.hitDice = 0;
			this.constHP = true;
		}
		else {
			this.hitPoints = "";
			this.numOfHitDice = Number(numOfHitDice);
			this.hpModifier = Number(hpModifier);
			if (d4) {
				this.hitDice = 4;
			}
			else {
				if (d6) {
					this.hitDice = 6;
				}
				else {
					if (d8) {
						this.hitDice = 8;
					}
					else {
						if (d10) {
							this.hitDice = 10;
						}
						else {
							if (d12) {
								this.hitDice = 12;
							}
							else {
								if (d20) {
									this.hitDice = 20;
								}
							}
						}
					}
				}
			}
			this.constHP = false;
		}
	}

	setUniqueness() {
		if (this.name == "") {
			this.unique = false;
		}
		else {
			this.unique = true;
		}
	}

	changePageNumber(value) {
		this.pageNumber = value;
	}

}

/*
class NPC extends Character {
	constructor(name, race, passivePerception, dexterity, hitPoints, numOfHitDice, hpModifier, pageNumber, d4, d6, d8, d10, d12, d20) {
		super(name, race, passivePerception, dexterity, hitPoints);
		this.pageNumber = Number(pageNumber);
        this.setHPVars(numOfHitDice, hpModifier, d4, d6, d8, d10, d12, d20);
        this.setUniqueness();
        //this.runaway = runaway;
	}

	setHPVars(numOfHitDice, hpModifier, d4, d6, d8, d10, d12, d20) {
		if (numOfHitDice == "") {
			this.numOfHitDice = numOfHitDice;
			this.hpModifier = hpModifier;
			this.hitDice = 0;
			this.constHP = true;
		}
		else {
			this.numOfHitDice = Number(numOfHitDice);
			this.hpModifier = Number(hpModifier);
			if (d4) {
				this.hitDice = 4;
			}
			else {
				if (d6) {
					this.hitDice = 6;
				}
				else {
					if (d8) {
						this.hitDice = 8;
					}
					else {
						if (d10) {
							this.hitDice = 10;
						}
						else {
							if (d12) {
								this.hitDice = 12;
							}
							else {
								if (d20) {
									this.hitDice = 20;
								}
							}
						}
					}
				}
			}
			this.constHP = false;
		}
	}

	setUniqueness() {
		if (this.name == "") {
			this.unique = false;
		}
		else {
			this.unique = true;
		}
	}

	changePageNumber(value) {
		this.pageNumber = value;
	}

	randomizeHP() {
		/*
        if (runaway) {
            return this.hitPoints;
		}
		
		var roll = 0;
		for (var j = 0; j < this.numOfHitDice; j++) {
			roll += (Math.floor(Math.random() * this.hitDice) + 1);
		}
		roll += this.hpModifier;
		//this.hitPoints = roll;
		return roll;
	}
}
*/