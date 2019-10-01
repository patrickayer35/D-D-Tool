class Character {
	constructor(name, race, passivePerception, dexterity, hitPoints) {
		this.name = name;
		this.race = race;
		this.passivePerception = passivePerception;
		this.dexterity = dexterity;
		this.hitPoints = hitPoints;
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

	adjustHP(value) {
		this.hitPoints += Number(value);
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
	constructor(name, race, passivePerception, dexterity, hitPoints, numOfHitDice, hpModifier, pageNumber, d4, d6, d8, d10, d12, d20) {
		super(name, race, passivePerception, dexterity, hitPoints);
		this.numOfHitDice = Number(numOfHitDice);
		this.hpModifier = Number(hpModifier);
		this.pageNumber = Number(pageNumber);
        this.setHitDice(d4, d6, d8, d10, d12, d20);
        this.setUniqueness();
        //this.runaway = runaway;
	}

	setUniqueness() {
		if (this.name == "") {
			this.unique = false;
		}
		else {
			this.unique = true;
		}
	}

	setHitDice(d4, d6, d8, d10, d12, d20) {
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
	}

	randomizeHP() {
		/*
        if (runaway) {
            return this.hitPoints;
		}
		*/
		var roll = 0;
		for (var j = 0; j < this.numOfHitDice; j++) {
			roll += (Math.floor(Math.random() * this.hitDice) + 1);
		}
		roll += this.hpModifier;
		//this.hitPoints = roll;
		return roll;
	}
}