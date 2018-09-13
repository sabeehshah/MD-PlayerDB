import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

import { Player } from '../../models/Player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  totalOwed: number;



  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
      this.getTotalOwed();
    });
  }

  getTotalOwed(){
    const total = this.players.reduce((total, player) => { 
      return total + parseFloat(player.balance.toString());
    },0);

    this.totalOwed = total;
  }

}
