import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { Player } from '../../models/Player';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
player: Player = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  balance: 0
}

disabledBalanceOnAdd: boolean = true;
@ViewChild('playerForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private playerService: PlayerService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value:Player, valid:boolean}) {
    if(this.disabledBalanceOnAdd) {
      value.balance = 0;

    }
    if(!valid){
      //Show error message
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      //Add new player
      this.playerService.newPlayer(value);
      //Show message
      this.flashMessage.show('New player added.', {
        cssClass: 'alert-success', timeout: 4000
      });

      //Redirect to dash
      this.router.navigate(['/']);
    }
  }
  

}
