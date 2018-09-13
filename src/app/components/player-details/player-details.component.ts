import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  id:string;
  player: Player;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private playerService: PlayerService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.playerService.getPlayer(this.id).subscribe(player => {
      if(player != null){
        if(player.balance > 0){
          this.hasBalance = true;
        }
      }
      this.player = player;
      console.log(this.player);
    });

  }

  updateBalance(){
    this.playerService.updatePlayer(this.player);
    this.flashMessage.show('Balance Updated.', {cssClass: 'alert-success', timeout: 4000});
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.playerService.deletePlayer(this.player);
      this.flashMessage.show('Player Removed.', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
