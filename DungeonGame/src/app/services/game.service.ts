import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private socket: any;

  constructor() { }

  private characters: { name: string, description: string }[] = [
    { "name": 'Barbarian', "description": 'Once per turn, you may choose to reroll all dice when on 1 Health' },
    { "name": 'Cleric', "description": 'If you roll the same number with all Energy dice, you can increase it by 2 (max.6)' },
    { "name": 'Knight', "description": 'Once per Dungeon Level you may assign 2 Energy dice of the same value' },
    { "name": 'Necromancer', "description": 'Once per Dungeon Level you may choose to lose 1 HP to inflict 1 Damage' },
    { "name": 'Paladin', "description": 'Once per Dungeon Level you may leave one Energy Dice in place from last turn' },
    { "name": 'Ranger', "description": 'Once per Dungeon Level you may assign a die to Range instead of Speed' },
    { "name": 'Rogue', "description": 'Once per Dungeon Level you may increase the value of all Energy dice rolled by 1' },
    { "name": 'Wizard', "description": 'Once per Dungeon Level you may reroll all Energy dice' },
  ];

  setupSocketConnection() {
    this.socket = io();
  }

  emit(event: string, ...data: any) {
    this.socket.emit(event, data);
  }

  listenToServer(connection: any): Observable<any> {
    return new Observable((subscribe) => {
      this.socket.on(connection, (...data: any[]) => {
        subscribe.next(data);
      })
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getCharacters(): { name: string, description: string }[] {
    return this.characters;
  }
}
