import { Component, OnInit } from '@angular/core';
import { PartyService } from './service/party.service';

import { Party } from './object/party';
import {PartyListProfileComponentGPX} from './partyListProfile.component';

@Component({
  selector: 'party-list',
  template: `

    <ul style="list-style-type:none">
      <li *ngFor="let party of parties">
        <party-list-profile [party]="party"></party-list-profile>
      </li>
    </ul>
  `,
  styles: [``],
  providers: [PartyService],
  directives: [PartyListProfileComponentGPX]

})

export class PartyListComponentGPX  implements OnInit{
  parties: Party[];

  constructor(private partyService: PartyService) { }

  
  getParties(): void {
    //this.partyService.getParties().then(parties => this.parties = parties);
    this.parties = this.partyService.getParties();
    console.log(this.parties.length + ' parties');
  }

  ngOnInit(): void {
    this.getParties();
  }
}
