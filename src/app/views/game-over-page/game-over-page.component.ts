import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/Player';

@Component({
  selector: 'app-game-over-page',
  templateUrl: './game-over-page.component.html',
  styleUrls: ['./game-over-page.component.scss']
})
export class GameOverPageComponent implements OnInit {
  @Input() type: string;
  @Input() winner: Player;

  constructor() { }

  ngOnInit(): void {
  }

}
