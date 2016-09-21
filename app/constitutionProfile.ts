import {Component} from '@angular/core';
import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {PeopleService} from './service/people.service';
import {People} from './object/people';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';

@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [BannerGPXComponent, TAB_DIRECTIVES, People, CollapseDirective],
  providers:[PeopleService]
})

export class ConstitutionProfileGPX {
	public isCollapsed:boolean = false;

	public isCMCollapsed:boolean = false;
	public electedPersons=[];
	public contestedPersons=[];

	constructor(private peopleService: PeopleService) {  
		//this.getElectedMembers("state");
		this.electedPersons = peopleService.getElectedMembers('');
		this.contestedPersons = peopleService.getContestedMembers('');
	}

	getElectedMembers(type:String){
		//this.electedPersons = this.peopleService.getElectedMembers(type);
		//return this.electedPersons;
	}

	saidHello($event){
	  alert(`You said hello to ${$event}`)
	}
/*
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
  */
}