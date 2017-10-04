import { Injectable, OnChanges } from '@angular/core';

@Injectable()
export class DataShareService {
  public selected_permission:string='Viewer';

  public displayMode:boolean = false;

  //currentUserId will be set with logged in userid
  public currentUserId:string = 'u001';
  public viewingUserId:string; //SHOULD BE DEPRECATED
  public viewingUser = {};
  public viewingDistrict = {};
  
  public currentDistrictId:string = 'g0010';
  public selectedLegislatorId:string = 'g0010';


  getCurrentUserId():string{
   return this.currentUserId;
  }

  setCurrentUserId(userId:string){
   this.currentUserId = userId;
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