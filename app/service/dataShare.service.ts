import { Injectable, OnChanges, ViewRef } from '@angular/core';

@Injectable()
export class DataShareService {
  public selected_permission:string='Viewer';

  public displayMode:boolean = false;

  //currentUserId will be set with logged in userid
  public currentUserId:string = 'yuvarajm1';//'u001'; 
  public currentUser = {};
  
  public viewingUserId:string; //SHOULD BE DEPRECATED
  public viewingUser = {};
  public viewingDistrict = {};
  
  public currentDistrictId:string = 'g0010';
  public selectedLegislatorId:string = 'g0010';

  map = new Map();

  //serviceUrl:string = "http://Gpx-env.e2xj3uszee.us-east-2.elasticbeanstalk.com";
  serviceUrl:string = "http://localhost:5000";

  public getServiceUrl():string{
    return this.serviceUrl;
  }

  public setDistrictViews(comp:any, vRef:ViewRef){
    console.log("setDistrictViews() comp " + comp);
    console.log("vRef " + vRef);
    this.map.set(comp, vRef);
  } 
  
  public getDistrictView(comp:any):any{
    let component:any;    
    console.log("getDistrictView() comp " + comp);
    console.log("this.map.size " + this.map.size);
    for (var i = 0; i <= this.map.size; i++) {
      console.log("this.map.get(i) " + this.map.get(i));
    }
    if(this.map.has(comp)){
      component = this.map.get(comp);
      this.map.delete(comp);
    }

    return component;
  } 


  getCurrentUserId():string{
   return this.currentUserId;
  }

  setCurrentUserId(userId:string){
   this.currentUserId = userId;
  }
  
  getCurrentUser():any{
   return this.currentUser;
  }

  setCurrentUser(user:any){
   this.currentUser = user;
  }

  getViewingUserId():string{
   return this.viewingUserId;
  }

  setViewingUserId(userId:string){
   this.viewingUserId = userId;
  }

  getViewingUser():any{
   return this.viewingUser;
  }

  setViewingUser(user:any){
   this.viewingUser = user;
  }

  getViewingDistrict():any{
   return this.viewingDistrict;
  }

  setViewingDistrict(district:any){
   this.viewingDistrict = district;
  }

  getSelectedLegislatorId():string{
   return this.selectedLegislatorId;
  }

  setSelectedLegislatorId(selectedLegislatorId:string){
   this.selectedLegislatorId = selectedLegislatorId;
  }
    getCurrentDistrictId():string{
    return this.currentDistrictId
  }

  setCurrentDistrictId(districtId:string){
   this.currentDistrictId = districtId;
  }

  getPermission():string{
  	//console.log("getPermission() " + this.selected_permission);
  	return this.selected_permission;
  }

  setPermission(data:string){
  	this.selected_permission = data;	
  	//console.log("setPermission() " + this.selected_permission);

  }

  checkPermissions():boolean {
      if(this.selected_permission == 'Editor') {
        this.displayMode = true;
      } 
      else {
        this.displayMode = false;
      }

  	  //console.log("displayMode " + this.displayMode);

      return this.displayMode;
    }


}