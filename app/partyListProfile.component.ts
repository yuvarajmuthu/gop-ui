import { Component, Input, OnInit } from '@angular/core';
import { Party } from './object/party';
import {BannerGPXComponent} from './banner.component';

@Component({
  selector: 'party-list-profile',
  template: `
    <div *ngIf="party" class="partyListProfile">
      <div class="col-xs-2">
        <banner-gpx [imageUrl]="imageName" [height]="50" [width]="50"></banner-gpx>
      </div>
      <div class="col-xs10">
        <ul style="list-style-type:none">
          <li>Name: {{party.name}}</li>   
          <li>Type: {{party.name}}</li>
          <li>Established Date: {{party.establishedDate}}</li>
          <li>Registered Address: {{party.registeredAddress}}</li>
          <li>Ideology: {{party.ideology}}</li>
        </ul>
      </div>
  </div>
  `,
  styles: [``],
  directives: [BannerGPXComponent]
})
export class PartyListProfileComponentGPX implements OnInit{
  @Input() party: Party;
  imageName:String;

  ngOnInit(): void {
    this.imageName = '../../images/'+this.party.profileImage;
    console.log(this.imageName);
  }
}
