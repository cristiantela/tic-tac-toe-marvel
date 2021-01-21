import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '../../models/Player';

import _ from 'lodash'

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  @Input() currentPlayer: Player;
  @Output() nextPlayer = new EventEmitter<void>()
  @Output() tie = new EventEmitter<void>()
  @Output() win = new EventEmitter<Player>()

  grid: object[][];

  constructor() { }

  ngOnInit(): void {
    this.grid = [new Array(3), new Array(3), new Array(3)]
  }

  drawInBlock(y: number, x: number) {
    if (this.grid[y][x]) {
      return false;
    }

    this.grid[y][x] = this.currentPlayer;

    const winner: Player = this.getWinner();

    if (winner) {
      this.win.emit(winner);
    } else if (!this.isThereABlockNotDrawn()) {
      this.tie.emit();
    } else {
      this.nextPlayer.emit();
    }
  }

  isThereABlockNotDrawn(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        if (!this.grid[row][column]) {
          return true;
        }
      }
    }

    return false;
  }

  checkIfListIsCompleteAndAllItemsAreTheSame(list: Player[]) {
    const filteredItems = _.filter(list);

    return filteredItems.length === 3 && _.uniq(filteredItems).length === 1
  }

  getWinner(): Player {
    let horizontalWinner;
    let verticalWinner;
    let diagonal1Winner;
    let diagonal2Winner;

    for (let variable = 0; variable < 3; variable++) {
      const horizontalList =
        _.range(3)
          .map(column => this.grid[variable][column]);

      if (this.checkIfListIsCompleteAndAllItemsAreTheSame(horizontalList)) {
        horizontalWinner = horizontalList[0];
      }

      const verticalList =
        _.range(3)
          .map(row => this.grid[row][variable]);

      if (this.checkIfListIsCompleteAndAllItemsAreTheSame(verticalList)) {
        verticalWinner = verticalList[0];
      }
    }

    const diagonal1List =
      _.range(3)
        .map(variable => this.grid[variable][variable]);

    if (this.checkIfListIsCompleteAndAllItemsAreTheSame(diagonal1List)) {
      diagonal1Winner = diagonal1List[0];
    }

    const diagonal2List =
      _.range(3)
        .map(variable => this.grid[variable][2 - variable]);

    if (this.checkIfListIsCompleteAndAllItemsAreTheSame(diagonal2List)) {
      diagonal2Winner = diagonal2List[0];
    }

    return horizontalWinner || verticalWinner || diagonal1Winner || diagonal2Winner;
  }

  reset() {
    this.grid = [new Array(3), new Array(3), new Array(3)]
  }
}
