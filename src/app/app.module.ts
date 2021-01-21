import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PlayerSelectorComponent } from './components/player-selector/player-selector.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { ButtonComponent } from './components/button/button.component';
import { GameOverPageComponent } from './views/game-over-page/game-over-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerSelectorComponent,
    TicTacToeComponent,
    ButtonComponent,
    GameOverPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
