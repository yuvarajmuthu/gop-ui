import {Component, EventEmitter, Input, Output} from '@angular/core';
import { LegislatorsService } from './service/legislators.service';
import { Legislator } from './object/legislator';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'search-legislator',
  //outputs: ['success'],
  template: `


      <label>Find your legislators: </label>
   
      <input class="form-control" [(ngModel)]="ipZipcode" placeholder="Zipcode" />

    <!--  <input (click)="search(ipZipcode)" type="submit" value="Search" /> -->


    <label class="btn btn-success" uncheckable (click)="search(ipZipcode)">Search</label>
<!--      <label class="btn btn-default glyphicon glyphicon-search" (click)="search(ipZipcode)"></label> -->

  `
})
export class SearchLegislatorComponentGPX {
  legislators: Array<Legislator> = [];
  resultop:any;
  ipZipcode:String = '';

  @Output()
  success = new EventEmitter();
  
  constructor(private legislatorsService: LegislatorsService) {
    //this.success = new EventEmitter();
  }

  search(query: string) {
    console.log("Search value: " + query);
    //$event.preventDefault()
    //let results = this.languageRepository.search(query);
    //this.success.next({ results: results });
    this.legislators = [];
    this.getLegislatorsByZipCode(query);
  }

  
  getLegislatorsByZipCode(zipcode:string) {
    this.legislatorsService.getLegislature(zipcode)
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              for(var i = 0;i<result.length;i++) {
               this.legislators.push(result[i]);
              }
            //this.resultop = result;
              //this.legislators = result.map(this.toLegis);
               //result.map(this.toLegis);
              console.log("Emitting: " + this.legislators);
              //this.success.emit(this.legislators);
              this.success.emit({legislators : this.legislators});
            });

    //console.log(this.legislators.length + ' legislators');
  }
}