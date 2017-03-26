import { Component, OnInit } from '@angular/core';
import { DICE_IMAGES } from '../../utilities/images';
import { Randomizer } from '../../utilities/randomizer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  diceOneIndex: number;
  diceTwoIndex: number;
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

  get diceOneSrc(): string {
    return DICE_IMAGES[this.diceOneIndex];
  }

  get diceTwoSrc(): string {
    return DICE_IMAGES[this.diceTwoIndex];
  }

  get endGameMessage(): string {
    return this.isWinner ? 'You win!' : 'You are a loser!';
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
      do {
        randomNumber = Randomizer.GetRandomNumber(0, 5);
      } while(randomNumber === this.diceOneIndex)

      this.diceOneIndex = randomNumber;

      randomNumber = 0;

      do {
        randomNumber = Randomizer.GetRandomNumber(0, 5);
      } while(randomNumber === this.diceTwoIndex)

      this.diceTwoIndex = randomNumber;
      rollDiceCount++;

      if (rollDiceCount >= this.rollInterval) {
        this.isDiceRolling = false;
        this._getDiceResults();
        clearInterval(rollInterval);
      }
    }, 500);
  }

  private _validateInput() {
    if (this.guessNumber && this.guessNumber >= 2 && this.guessNumber <= 12) {
      return true;
    }

    return false;
  }

  private _initGame() {
    this.diceOneIndex = 0;
    this.diceTwoIndex = 0;
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
    this.gameTotal = (this.diceOneIndex + 1) + (this.diceTwoIndex + 1);

    if (this.gameGuess === this.gameTotal) {
      this.isWinner = true;
    } else {
      this.isLoser = true;
    }
  }

}
