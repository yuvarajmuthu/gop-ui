import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {DataShareService} from "./dataShare.service";

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupService {
  serviceUrl:string;// = "http://127.0.0.1:8080/group";

  constructor (private http: Http, private jsonp:Jsonp, private dataShareService:DataShareService) {
    this.serviceUrl = dataShareService.getServiceUrl() + "/group";
  }
    
  result:any; 
  resultop:any;

//NOT USED  
getGroupDataByName_External(searchParam:string, type:string):Observable<any>{
    //required for using jsonp. JSONP is used to get data from cross domain
    console.log("getGroupByName() in Group service - searchParam " + searchParam);
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', "JSONP_CALLBACK");

    let url:string;
    if(type == 'googleCivic'){ // get Congress legislators by Division id
      //find District
      //searchParam = "gettysburg montessori charter school";
      url = "https://www.googleapis.com/civicinfo/v2/divisions?key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY&query=" +  searchParam;
      //https://www.googleapis.com/civicinfo/v2/divisions?query="ocd-division/country:us/state:pa/cd:6"&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY
      //https://www.googleapis.com/civicinfo/v2/divisions?query="gettysburg montessori charter school"&key=AIzaSyBShZOVB_EtWokgbL0e6ZWHpAHpwVY5vZY
    }


    console.log('getGroupByName API - ' + url);  
    return this.jsonp.get(url, { search: params })
                  .map((response:Response) => response.json());
} 

//GET THE GROUP INFO BY 
//-GROUP ID OR EXTERNAL SOURCE ID
//OTHERWISE SHOULD CREATE THE GROUP WITH DEFAULT PROFILE INFORMATION
  getGroupData(type:string, sourceId:string):Observable<any> { 
    /*
    let groupData = this.http.get('/app/data/json/fromService/group.json')
                             .map((response:Response) => response.json());
    console.log("group data " + groupData);
    return groupData;
*/  
  if(type == "CREATE"){
      return this.http.get('/app/data/json/fromService/group.json')
                               .map((response:Response) => response.json());
      //TODO
      //DO NOT SHOW SOURCEID IN THIS CASE OR SHOULD HAVE GROUP ID                           
    }else{
      let serviceUrl = this.serviceUrl + "/" + type;
      //this.serviceUrl = this.serviceUrl + "/" + type;
      console.log("getGroup group.service this.serviceUrl " + serviceUrl);
     //let bodyString = JSON.stringify(post); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      
      if(sourceId != null){
        serviceUrl = serviceUrl + "?externalId=" + sourceId;
      }

      let options       = new RequestOptions({ headers: headers}); // Create a request option
      /*
      .switchMap(
        
        res1 => {
          if(res1.status === 200){
            this.http.get('/app/data/json/fromService/group.json');
          }
        }
       
      )
       */
      return this.http.get(serviceUrl, options) // ...using post request
                       .map((res:Response) => {
                       }) // ...and calling .json() on the response to return data
                       .catch((error:any) => {
                          if(error.status === 404){//NOT FOUND
                            return this.http.get('/app/data/json/fromService/group.json')
                            .map((response:Response) => {
                              //response.json()
                              let outputJson:JSON = response.json();
                              let output = JSON.parse(response.text());
                              let data:[{}] =output['profileData'][0].data;
                              //TODO
                              //searched District does not exist in the system, user shall create one
                              if(sourceId != null){
                                output['profileData'][0].data.push({"sourceId":sourceId});
                                response = output;//JSON.parse(output);
                                console.log('Modified response ', JSON.stringify(response));
                              }
                              return response;
                            });

                          }else{
                            console.error('UI error handling' + JSON.stringify(error));
                            return Observable.throw(error.json().error || 'Server error')
                        }
                       });
    }

  }

  createGroup(request:string):Observable<any>{
    console.log("createGroup group.service " + request + " this.serviceUrl " + this.serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateGroup(groupId:string, request:string):Observable<any>{
    let serviceUrl = this.serviceUrl + "/" + groupId;
    console.log("updateGroup group.service " + request + " this.serviceUrl " + serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
