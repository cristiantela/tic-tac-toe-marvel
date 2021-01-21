import { Component, OnInit, ViewChild } from '@angular/core';

import { Player } from './models/Player'

import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component'

import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('ticTacToe') ticTacToe: TicTacToeComponent;

  title = 'tic-tac-toe-marvel';

  players: Player[];
  currentPlayer: Player;
  lastWinner: Player;

  currentStep: string;

  gameOverType: string;

  constructor() { }

  ngOnInit(): void {
    this.players = [];
    this.changeStep('enterPlayers');
  }

  changeStep(step: string) {
    if (step === 'enterPlayers') {
      this.currentStep = 'enterPlayers';
    } else if (step === 'startTheGame') {
      this.currentStep = 'gameStarted';
      const randomFirstPlayerIndex = Math.floor(Math.random() * this.players.length);
      this.players[randomFirstPlayerIndex].symbol = 'X';
      this.players[randomFirstPlayerIndex === 0 ? 1 : 0].symbol = 'O';
      this.currentPlayer = _.get(this.players, randomFirstPlayerIndex);
    }
  }

  addPlayer(player: Player) {
    this.players.push(player);

    if (this.players.length === 2) {
      this.changeStep('startTheGame');
    }
  }

  nextPlayer() {
    const playerIndex = _.findIndex(this.players, this.currentPlayer);
    let nextPlayer = this.players[playerIndex + 1];

    if (nextPlayer) {
      this.currentPlayer = nextPlayer;
    } else {
      this.currentPlayer = this.players[0];
    }
  }

  playAgain() {
    this.gameOverType = '';
    this.ticTacToe.reset();
  }

  tie() {
    this.gameOverType = 'tie';
  }

  win(winner: Player) {
    this.gameOverType = 'win';
    this.lastWinner = winner;
    winner.score++;
  }

  resetScores() {
    this.players.forEach(player => {
      player.score = 0;
    });
  }
}
