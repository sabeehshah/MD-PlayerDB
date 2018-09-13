import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/Player';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  id:string;
  player: Player = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
    role: '',
  }

  disableBalanceOnEdit: boolean = true;

  constructor(
    private playerService: PlayerService,
    private router: Router, 
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.playerService.getPlayer(this.id).subscribe(player => this.player = player);


  }

  onSubmit({value, valid}: {value: Player, valid:boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', { cssClass: 'alert-danger', timeout:4000 });

    }else{
      value.id = this.id;
      this.playerService.updatePlayer(value);
      this.flashMessage.show('Player updated.', { cssClass: 'alert-success', timeout:4000 });
      this.router.navigate(['/player/'+this.id]);
    }
  }


}
