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
  //apikey_openstate = c7ba0e13-03f6-4477-b9f1-8e8832169ee5
  //https://openstates.org/api/v1/legislators/DCL000012?apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5
  //https://openstates.org/api/v1/legislators/geo/?lat=35.79&long=-78.78&apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5
  //https://openstates.org/api/v1/legislators/?state=dc&chamber=upper&apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5
	
  private legislature_by_zipcode_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=';
  private legislature_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators';//?bioguide_id=B001296&apikey=fd1d412896f54a8583fd039670983e59
  private legislature_service_url_suffix = '&apikey=fd1d412896f54a8583fd039670983e59';
//https://congress.api.sunlightfoundation.com/legislators/locate?zip=19406&apikey=fd1d412896f54a8583fd039670983e59
//https://congress.api.sunlightfoundation.com/legislators?bioguide_id=T000461&apikey=fd1d412896f54a8583fd039670983e59
//https://congress.api.sunlightfoundation.com/legislators/locate?latitude=42.96&longitude=-108.09&apikey=fd1d412896f54a8583fd039670983e59

//Committees and subcommittees a given legislator is assigned to
//https://congress.api.sunlightfoundation.com/committees?member_ids=T000461&apikey=fd1d412896f54a8583fd039670983e59
  private legisCommittee_prefix = 'https://congress.api.sunlightfoundation.com/committees?member_ids=';
  private legisCommittee_suffix = this.legislature_service_url_suffix;


//get district by lat/long
//https://congress.api.sunlightfoundation.com/districts/locate?latitude=40.402777&longitude=-80.058543&apikey=fd1d412896f54a8583fd039670983e59
  private district_prefix = 'https://congress.api.sunlightfoundation.com/districts/locate?';
  private district_suffix = this.legislature_service_url_suffix;

//get district by zipcode
//https://congress.api.sunlightfoundation.com/districts/locate?zip=11216&apikey=fd1d412896f54a8583fd039670983e59

private google_geocode_api_prefix = 'https://maps.google.com/maps/api/geocode/json?address=';
private google_geocode_api_suffix = '&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY';

getLegislature(searchParam:string, type:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    console.log("getLegislature() in legislators service - searchParam " + searchParam);
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    if(type == 'zipcode'){
      url = this.legislature_service_url_prefix + '/locate?zip=' + searchParam + this.legislature_service_url_suffix;
    }
    else if(type == 'bioguide_id'){// get State legislator profile by id
      //url = this.legislature_service_url_prefix + '?bioguide_id=' + searchParam + this.legislature_service_url_suffix;
      url = 'https://openstates.org/api/v1/legislators/' + searchParam + '?apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5';
    }
    else if(type == 'latlong'){// get State legislators by Address
      let locationArr = searchParam.split(',');
      //url = this.legislature_service_url_prefix + '/locate?latitude=' + locationArr[0] + '&longitude=' + locationArr[1] + this.legislature_service_url_suffix;
      //https://openstates.org/api/v1/legislators/geo/?lat=40.402777&long=-80.058544&apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5
      url = 'https://openstates.org/api/v1/legislators/geo/?lat='+ locationArr[0] + '&long=' + locationArr[1] + '&apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5';
    } else if(type == 'congress'){ // get Congress legislators by Address
      //https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY&address=300%20Chatham%20Park%20Drive%2CPittsburgh%2C%20PA%2015220
      url = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY&address=" + encodeURIComponent(searchParam);
      //this.getDistrictInfoFromGoogle(url);
    } else if(type == 'byCongressDistrict'){ // get Congress legislators by Division id
      url = "https://www.googleapis.com/civicinfo/v2/representatives/ocdId?ocdId="+ searchParam +"&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY";
      //this.getDistrictInfoFromGoogle(url);
      //https://www.googleapis.com/civicinfo/v2/representatives/ocdId?ocdId=ocd-division/country:us/state:pa/cd:6&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY
      //find District
      //https://www.googleapis.com/civicinfo/v2/divisions?query="ocd-division/country:us/state:pa/cd:6"&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY
      //https://www.googleapis.com/civicinfo/v2/divisions?query="gettysburg montessori charter school"&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY
    }


    console.log('getLegislature API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 

getLocation(term: string):Observable<any> {
  let geocodeApi:string = this.google_geocode_api_prefix + term + this.google_geocode_api_suffix;
  console.log('geocodeApi ', geocodeApi);
  //return this.http.get(geocodeApi)
  return this.http.get('/app/data/mock/geoCode.json') 
  .map((response:Response) => response.json());
}

getDistrictInfoFromGoogle(url:string):Observable<any>{
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");
    console.log('in getDistrictInfoFromGoogle');   

    return this.jsonp.get(url, { search: params })
                  .map((response) => {
                    console.log('getDistrictInfoFromGoogle ' + JSON.stringify(response));  
                    console.log('getDistrictInfoFromGoogle ' + JSON.stringify(response['divisions']));
                    return response['divisions'];    
                  });
}


  getDistrict(value:string, category:string):Observable<any>{
    let url:string;
    //required for using jsonp. JSONP is used to get data from cross domain
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    if(category == 'zipcode'){
      url = this.district_prefix + 'zip=' + value + this.district_suffix;

    } else if(category == 'latlong'){
      let locationArr = value.split(',');
       url = this.district_prefix + 'latitude=' + locationArr[0] + '&longitude=' + locationArr[1] + this.district_suffix;

    }  

    console.log('getDistrict - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());

  }

//DEPRECATED
getDistrictByLatLong(lat:string, long:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    url = this.district_prefix + 'latitude=' + lat + '&longitude=' + long + this.district_suffix;

    console.log('getDistrictByLatLong API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
}

//DEPRECATED
getDistrictByZipcode(zipcode:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    url = this.district_prefix + 'zip=' + zipcode + this.district_suffix;

    console.log('getDistrictByZipcode API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 

getCommittees(legisId:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    console.log("getCommittees() in service - legislators.service for legislator " + legisId);
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    //url = this.legisCommittee_prefix + legisId + this.legisCommittee_suffix;
    url = 'https://openstates.org/api/v1/committees/' + legisId + '?apikey=c7ba0e13-03f6-4477-b9f1-8e8832169ee5';

    console.log('getLegislature API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 


  getElectedMembers(type:String) {
    return this.http.get('/app/data/json/legislators-elected.json')
    //.map(result => this.resultop = result.results)
    .map(res => {return res.json()})
    .map((data) => {
      let legisArr: Array<any> = data['results'];
      let result:Array<Legislator> = [];
      if (legisArr) {
        console.log("Elected persons from json " + legisArr.length);
/*
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
                       '',
                       []                       ));
        });

        console.log("Elected persons - sample " + result[0]);
        */

      }
      return result;
    })
    ;


  }

  getContestedMembers(type:String){
    return this.getElectedMembers(type);
  }
}
