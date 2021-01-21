import { Component, OnInit } from '@angular/core';

import { Player } from './models/Player'

import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe-marvel';

  players: Player[];
  currentPlayer: Player

  currentStep: string;

  constructor() { }

  ngOnInit(): void {
    this.players = [];
    this.changeStep('enterPlayers');
  }

  changeStep(step: string) {
    if (step === 'enterPlayers') {
      this.currentStep = 'enterPlayers';
    }
  }

  addPlayer(player: Player) {
    this.players.push(player);

    if (this.players.length === 2) {
      this.changeStep('startTheGame');
    }
  }
}
