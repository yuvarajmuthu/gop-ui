import { Component, Input, OnInit } from '@angular/core';
import { Legislator } from './object/legislator';
import {BannerGPXComponent} from './banner.component';

@Component({
  selector: 'legislator',
  template: `
    <div *ngIf="legislator" (click)="gotoLegislator(legislator)">
      <div class="shortProfileInfo">
        <div>
          <div class="col-xs-4">
            <a href="#" class="glyphicon glyphicon-user" aria-hidden="true"></a>
          </div>
          <div>
              <ul style="list-style-type:none">
                <li>{{legislator.first_name}} {{legislator.last_name}}</li>   
                <li>Title: {{legislator.title}}</li>
                <li>Chamber: {{legislator.chamber}}</li>
                <li>District: {{legislator.district}}</li>
                <li>Party: {{legislator.party}}</li>
                <li>State: {{legislator.state}}</li>
                <li>Term: {{legislator.term_start}} until {{legislator.term_end}}</li>
              </ul>
          </div>    
        </div>
      </div>
  </div>
  `,
  styles: [`
   .partyBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .partyBoundary:hover{
      border: 2px solid lightblue;
    }

    .shortProfileInfo li{
      border: 1px dotted lightblue; 
    }

    .smProfileImg{
      max-width: 100%;
      height: auto;
    }


    `],
  directives: [BannerGPXComponent]
})
export class LegislatorComponentGPX implements OnInit{
  @Input() legislator: Legislator;
  imageName:String;

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    //console.log(this.imageName);
  }

  gotoLegislator(legislator: Legislator):void{
    alert(legislator.first_name);
  }
}
