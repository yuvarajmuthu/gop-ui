import { Injectable } from '@angular/core';
import { Legislator } from './../object/legislator';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams  } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LegislatorsService {

	constructor (private http: Http, private jsonp:Jsonp) {}
  
	//resultOP:Observable<Legislator[]>;
  result:any; 
  legislators: Array<Legislator> = [];
  resultop:any;
	private legislature_by_zipcode_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=';
  private legislature_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators';//?bioguide_id=B001296&apikey=fd1d412896f54a8583fd039670983e59
  private legislature_service_url_suffix = '&apikey=fd1d412896f54a8583fd039670983e59';
//https://congress.api.sunlightfoundation.com/legislators/locate?zip=19406&apikey=fd1d412896f54a8583fd039670983e59
//https://congress.api.sunlightfoundation.com/legislators?bioguide_id=T000461&apikey=fd1d412896f54a8583fd039670983e59
//https://congress.api.sunlightfoundation.com/legislators/locate?latitude=42.96&longitude=-108.09&apikey=fd1d412896f54a8583fd039670983e59

//get district by lat/long
//https://congress.api.sunlightfoundation.com/districts/locate?latitude=40.402777&longitude=-80.058543&apikey=fd1d412896f54a8583fd039670983e59
  private districtByLatLong_prefix = 'https://congress.api.sunlightfoundation.com/districts/locate?';
  private districtByLatLong_suffix = this.legislature_service_url_suffix;
getLegislature(searchParam:string, type:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    console.log("getLegislature() in service - searchParam " + searchParam);
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    if(type == 'zipcode'){
      url = this.legislature_service_url_prefix + '/locate?zip=' + searchParam + this.legislature_service_url_suffix;
    }
    else if(type == 'bioguide_id'){
      url = this.legislature_service_url_prefix + '?bioguide_id=' + searchParam + this.legislature_service_url_suffix;
    }
    else if(type == 'latlong'){
      let locationArr = searchParam.split(',');
      url = this.legislature_service_url_prefix + '/locate?latitude=' + locationArr[0] + '&longitude=' + locationArr[1] + this.legislature_service_url_suffix;
    }

    console.log('getLegislature API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 

getDistrictByLatLong(lat:string, long:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    url = this.districtByLatLong_prefix + 'latitide=' + lat + '&longitude=' + this.districtByLatLong_suffix;

    console.log('getDistrictByLatLong API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 

  getElectedMembers(type:String) {
  /* 
    var electedPersons = [
    { id: 11, name: 'Mr. Nice', designation: 'President' },
    { id: 12, name: 'Narco', designation: 'General Secretary' },
    { id: 13, name: 'Bombasto', designation: 'Youth wing secretary' },
    { id: 14, name: 'Celeritas', designation: 'Women wing secretary'},
    { id: 15, name: 'Magneta', designation: 'Agricultural secretary' },
    { id: 16, name: 'RubberMan', designation: 'Sport secretary' },
    { id: 17, name: 'Dynama', designation: 'Health secretary' },
    { id: 18, name: 'Dr IQ', designation: 'Finance secretary' },
    { id: 19, name: 'Magma', designation: 'Telecom secretary' },
    { id: 20, name: 'Tornado', designation: 'Village development secretary' }
  ];

    return electedPersons;
*/
    return this.http.get('/app/data/json/legislators-elected.json')
    //.map(result => this.resultop = result.results)
    .map(res => {return res.json()})
    .map((data) => {
      let legisArr: Array<any> = data['results'];
      let result:Array<Legislator> = [];
      if (legisArr) {
        console.log("Elected persons from json " + legisArr.length);

        legisArr.forEach((task) => {
          result.push(
                     new Legislator(
                       task['bioguide_id'],
                       task['birthday'],
                       task['chamber'],
                       task['contact_form'],
                       task['crp_id'],
                       task['district'],
                       task['facebook_id'],
                       task['fax'],
                       task['fec_ids'],
                       task['first_name'],
                       task['gender'],
                       task['govtrack_id'],
                       task['icpsr_id'],
                       task['in_office'],
                       task['last_name'],
                       task['leadership_role'],
                       task['middle_name'],
                       task['name_suffix'],
                       task['nickname'],
                       task['oc_email'],
                       task['ocd_id'],
                       task['office'],
                       task['party'],
                       task['phone'],
                       task['state'],
                       task['state_name'],
                       task['term_end'],
                       task['term_start'],
                       task['thomas_id'],
                       task['title'],
                       task['twitter_id'],
                       task['votesmart_id'],
                       task['website'],
                       task['youtube_id'],
                       ''                       ));
        });

        console.log("Elected persons - sample " + result[0]);

      }
      return result;
    })
    ;
    /*
    .subscribe((data) => {
        let result:any = data['results'];
              for(var i = 0;i<result.length;i++) {
               this.legislators.push(result[i]);
              }
              console.log("Emitting: " + this.legislators);
           
              //this.success.emit({legislators : this.legislators});
            });
            */
  }

  getContestedMembers(type:String){
    return this.getElectedMembers(type);
  }
}
