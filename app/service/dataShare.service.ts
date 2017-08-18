import { Injectable, OnChanges } from '@angular/core';

@Injectable()
export class DataShareService {
  public selected_permission:string='Viewer';

  public displayMode:boolean = false;
  private currentUser:string;


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