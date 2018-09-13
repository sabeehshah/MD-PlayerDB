import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Player } from '../models/Player';
 
@Injectable()
export class PlayerService {

  playersCollection: AngularFirestoreCollection<Player>;
  playerDoc: AngularFirestoreDocument<Player>;
  players: Observable<Player[]>;
  player: Observable<Player>;

  constructor(private afs: AngularFirestore) { 

    this.playersCollection = this.afs.collection('players', ref=> ref.orderBy('lastName', 'asc'));

  }

  getPlayers(): Observable<Player[]>{
    // Get players with the id
    this.players = this.playersCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Player;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.players;
  }

  newPlayer(player: Player){
    this.playersCollection.add(player);
  }

  getPlayer(id: string): Observable<Player> {
    this.playerDoc = this.afs.doc<Player>(`players/${id}`);
    this.player = this.playerDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as Player;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.player;
  }

  updatePlayer(player:Player){
    this.playerDoc = this.afs.doc(`players/${player.id}`);
    this.playerDoc.update(player);
  }

  deletePlayer(player:Player){
    this.playerDoc = this.afs.doc(`players/${player.id}`);
    this.playerDoc.delete();
  }
}
