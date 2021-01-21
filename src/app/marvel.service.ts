import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  rootUrl: string = 'https://gateway.marvel.com/v1/public/'

  constructor(private http: HttpClient) { }

  getCharactersByName(name: string) {
    return this.http.get(this.rootUrl + 'characters', {
      params: {
        name,
        apikey: environment.marvel.apiKey,
        hash: environment.marvel.hash,
        ts: environment.marvel.timestamp
      }
    })
  }
}
