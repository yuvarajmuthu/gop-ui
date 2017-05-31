import {Component, EventEmitter, ElementRef} from '@angular/core'

@Component({
  selector: 'person-gpx',
  inputs: ['personip'],
  outputs: ['hello'],
  templateUrl: 'app/view/Person.html'

})

export class PeopleComponentGPX {
	public personip:JSON;

  private el: HTMLElement;
 
  hello = new EventEmitter();
  constructor(el: ElementRef) { this.el = el.nativeElement; }
 
  //click(e) {
  //  this.hello.next(e);
  //}
 
  hoverme(){
    //alert('hovered on ' + this.person.name);
    this.el.style.borderStyle = "solid";
    //this.el.style.borderWidth = 5px;
    //this.el.style.backgroundColor = red;
  }
 
   
  away(){
    //alert('away');
    this.el.style.borderStyle = "none";
    //this.el.style.backgroundColor = red;
  }

}