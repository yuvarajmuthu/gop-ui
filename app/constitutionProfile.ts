import {Component} from '@angular/core';
import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {PeopleService} from './service/people.service';
import {PartyService} from './service/party.service';
import {People} from './object/people';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import {RatingComponent} from 'ng2-bootstrap/components/rating';
//import { NdvEditComponent } from 'angular2-click-to-edit/components';

@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [BannerGPXComponent, TAB_DIRECTIVES, People, CollapseDirective, RatingComponent],
  providers:[PeopleService, PartyService],
  styles: [`
    .constitutionTop{
      padding: .1px 1.5em;
      background: #f5f2f0;
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }
    
    .constitutionTop{
      padding-bottom: 5px;
    }

    .constitutionHeader,
    .constitutionDescription{
      border: 1px solid lightblue;
      border-radius: 5px;
    }

    .constitutionProfile .banner{
        max-width: 100%;
        height: auto;
        width:auto/9;
    }

    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;

    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      border-radius: 1px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;

    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})

export class ConstitutionProfileGPX {
	public isCollapsed:boolean = false;
	public isCMCollapsed:boolean = false;
	public isPartiesCollapsed:boolean = false;

	public electedPersons=[];
	public contestedPersons=[];
	public parties=[];

	constructor(private peopleService: PeopleService, private partyService: PartyService) {  
		//this.getElectedMembers("state");
		this.electedPersons = peopleService.getElectedMembers('');
		this.contestedPersons = peopleService.getContestedMembers('');
		this.parties = partyService.getParties('');
	}

	getElectedMembers(type:String){
		//this.electedPersons = this.peopleService.getElectedMembers(type);
		//return this.electedPersons;
	}

	saidHello($event){
	  alert(`You said hello to ${$event}`)
	}

  //START Ratings Component
  public x:number = 5;
  public y:number = 2;
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;
 
  public overStar:number;
  public percent:number;
 
  public ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
 
  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };
 
  public resetStar():void {
    this.overStar = void 0;
  }
  //END Ratings Component
  
}