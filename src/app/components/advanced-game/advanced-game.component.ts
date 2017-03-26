import { Component, OnInit } from '@angular/core';
import { DICE_IMAGES } from '../../utilities/images';
import { Randomizer } from '../../utilities/randomizer';

@Component({
  selector: 'app-advanced-game',
  templateUrl: './advanced-game.component.html',
  styleUrls: ['./advanced-game.component.css']
})
export class AdvancedGameComponent implements OnInit {
  diceResults: Array<number>;
  rollInterval: number;
  isDiceRolling: boolean;
  guessNumber: number;
  gameGuess: number;
  gameTotal: number;
  isError: boolean;
  isWinner: boolean;
  isLoser: boolean;

  constructor() { }

  ngOnInit() {
    this._initGame();
    this._clearGame();
  }

  get endGameMessage(): string {
    return this.isWinner ? 'You win!' : 'You are a loser!';
  }

  get minCountTotal(): number {
    return this.diceResults.length;
  }

  get maxCountTotal(): number {
    return this.diceResults.length * 6;
  }

  get canAddDice(): boolean {
    return this.diceResults.length < 5;
  }

  get canRemoveDice(): boolean {
    return this.diceResults.length > 1;
  }

  rollDice(): void {
    this._clearGame();
    this.gameGuess = this.guessNumber;

    if (!this._validateInput()) {
      this.isError = true;
      return;
    }

    this.isDiceRolling = true;
    let rollDiceCount = 0; 

    var rollInterval = setInterval(() => {
      let randomNumber;

      for (let i = 0; i < this.diceResults.length; i++) {

        do {
          randomNumber = Randomizer.GetRandomNumber(0, 5);
        } while(randomNumber === this.diceResults[i])

        this.diceResults[i] = randomNumber;

      }

      rollDiceCount++;

      if (rollDiceCount >= this.rollInterval) {
        this.isDiceRolling = false;
        this._getDiceResults();
        clearInterval(rollInterval);
      }
    }, 500);
  }

  getDiceImage(index: number): string {
    return DICE_IMAGES[index];
  }

  addDice() {
    this._clearGame();

    if (this.canAddDice) {
      this.diceResults.push(0);

      if (this.guessNumber < this.minCountTotal) {
        this.guessNumber = this.minCountTotal;
      }
    }
  }

  removeDice() {
    this._clearGame();

    if (this.canRemoveDice) {
      this.diceResults.splice(this.diceResults.length -1);

      if (this.guessNumber > this.maxCountTotal) {
        this.guessNumber = this.maxCountTotal;
      }
    }
  }

  private _validateInput() {
    if (this.guessNumber && this.guessNumber >= this.minCountTotal && this.guessNumber <= this.maxCountTotal) {
      return true;
    }

    return false;
  }

  private _initGame() {
    this.diceResults = [0, 0];
    this.rollInterval = 3;
    this.guessNumber = 2;
  }

  private _clearGame() {
    this.isError = false;
    this.isWinner = null;
    this.isLoser = null;
    this.isDiceRolling = false;
    this.gameTotal = null;
    this.gameGuess = null;
  }

  private _getDiceResults() {
    this.gameTotal = 0;

    for (let i = 0; i < this.diceResults.length; i++) {
      this.gameTotal += (this.diceResults[i] + 1);
    }

    if (this.gameGuess === this.gameTotal) {
      this.isWinner = true;
    } else {
      this.isLoser = true;
    }
  }

}

