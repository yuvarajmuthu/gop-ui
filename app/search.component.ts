import {Component, EventEmitter, Input, Output} from '@angular/core';
import { LegislatorsService } from './service/legislators.service';
import { Legislator } from './object/legislator';
import {LegislatorComponentGPX} from './legislator.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

@Component({
  selector: 'search-legislator',
  directives:[LegislatorComponentGPX],
  templateUrl: 'app/view/searchLegis.html',
  styles: [`
   .legisBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .legisBoundary:hover{
      border: 2px solid lightblue;
    }


    `]
})
export class SearchLegislatorComponentGPX {
  legislators: Array<Legislator> = [];
  resultop:any;
  ipZipcode:String = '';
  public selectedlegislator: Legislator;

  @Output()
  success = new EventEmitter();
  
  constructor(private  router: Router, private legislatorsService: LegislatorsService) {
    //this.success = new EventEmitter();
  }

  search(query: string) {
    console.log("Search value: " + query);
    this.legislators = [];
    this.getLegislators(query, 'zipcode');
  }

  
  getLegislators(searchParam:string, type:string) {
    this.legislatorsService.getLegislature(searchParam, type)
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              for(var i = 0;i<result.length;i++) {
               this.legislators.push(result[i]);
              }
              console.log("Emitting: " + this.legislators);
           
              //this.success.emit({legislators : this.legislators});
            });

    //console.log(this.legislators.length + ' legislators');
  }

  gotoLegislator(legislator: Legislator):void{
    this.selectedlegislator = legislator;

    console.log('selected item - ' +  this.selectedlegislator);    
    console.log('bioguide_id of selected item - ' +  this.selectedlegislator.bioguide_id);

    this.router.navigate(['/legislator', this.selectedlegislator.bioguide_id]);
  }
}