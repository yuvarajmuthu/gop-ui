import { Injectable, OnChanges } from '@angular/core';

@Injectable()
export class DataShareService {
  public selected_permission:string='Viewer';

  public displayMode:boolean = false;

  //currentUserId will be set with logged in userid
  public currentUserId:string = 'u001';
  public viewingUserId:string;

  public currentDistrictId:string = 'g0010';
  public selectedLegislatorId:string = 'g0010';


  getCurrentUserId():string{
   return this.currentUserId;
  }

  setViewingUserId(userId:string){
   this.viewingUserId = userId;
  }

  getViewingUserId():string{
   return this.viewingUserId;
  }

  setCurrentUserId(userId:string){
   this.currentUserId = userId;
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