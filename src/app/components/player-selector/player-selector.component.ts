import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarvelService } from '../../marvel.service';
import { Player } from '../../models/Player';

import _ from 'lodash'

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.scss']
})
export class PlayerSelectorComponent implements OnInit {
  @Input() players: Player[];
  @Output() addPlayer = new EventEmitter<Player>();

  name: string;
  suggestionsName: string[];
  searchingCharacter: boolean;
  errorCharacter: string;

  constructor(private marvel: MarvelService) { }

  ngOnInit(): void {
    this.name = 'A-Bomb (HAS)';
    this.suggestionsName = ['A-Bomb (HAS)', '3-D Man'];
  }

  savePlayer() {
    this.errorCharacter = '';

    const name = this.name.trim();

    if (name === '') {
      this.errorCharacter = 'Please, enter a Marvel character name';
      return false;
    }

    this.searchingCharacter = true;

    this.marvel.getCharactersByName(name).subscribe(response => {
      this.searchingCharacter = false;
      const total = _.get(response, 'data.total');

      if (total === 0) {
        this.errorCharacter = 'Marvel Character name not found';
      } else {
        const character = _.get(response, 'data.results.0');

        const {
          name,
          thumbnail
        } = character;

        this.addPlayer.emit({
          name,
          picture: `${thumbnail.path}.${thumbnail.extension}`,
          symbol: null,
          score: 0,
        })
      }
    })

    this.name = '';
  }

}
