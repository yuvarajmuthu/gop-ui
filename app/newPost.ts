import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, ViewContainerRef, TemplateRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';


import {DataShareService} from './service/dataShare.service';
import {PostService} from './service/post.service';

import {Post} from './object/post';

import {FileUploadComponent} from './file-upload/file-upload.component';

import { FileUploader } from './file-upload/file-uploader.class';
import { FileSelectDirective  } from './file-upload/file-select.directive';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';

//import { MODAL_DIRECTVES } from 'ng2-bootstrap/components/modal';
//import { MODAL_DIRECTVES, BS_VIEW_PROVIDERS, ModalDirective  } from 'ng2-bootstrap';

//import { BsModal } from 'ngx-bootstrap/modal/modal-options.class';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'newPost-gpx',
  templateUrl: 'app/view/newPost.html',
  directives: [CollapseDirective, FileUploadComponent],
  //directives: [FileUploadComponent, FileSelectDirective, CollapseDirective],  
  providers:[PostService],
  styles: [`
label {
   cursor: pointer;
   /* Style as you please, it will become the visible UI component. */
}

#upload-photo {
   opacity: 0;
   position: absolute;
   z-index: -1;
}

.fileUploadStage{
  margin-bottom: 40px;
  
}

.attachBtn{
  font-size:1.5em;  
}

  .newPostButton{

  }

  .newPost{
    width:auto;
  }

     .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */
    .another-file-over-class { border: dotted 3px green; }

  `]
})


export class NewPostGPX {

  /*public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
*/ 
  public isFileStagingAreaCollapsed:boolean = true;

/*
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
*/
  @Output() postEvent: EventEmitter<any> = new EventEmitter();

  @Input() parentPost:Post;
  txtPost:string = '';
  hideInput:boolean = false;
  //clearInput:boolean = false;


      constructor(private postService: PostService, private dataShareService:DataShareService) {  
  }

  submitPost(text:string){
    console.log("posting the comment " + text);

/*    let posts:string;

    if(posts = localStorage.getItem("userPosts")){
      console.log('Existing posts ' + posts);
      let postObj = {};
      let json = [];  

      postObj = JSON.parse(posts);
      json = postObj['postArray'];

      let post:string;

      post = '{ "txtPost":'+ JSON.stringify(this.txtPost) +'}';
      json.push(JSON.parse(post));
      
      postObj['postArray'] = json;

      localStorage.setItem("userPosts", JSON.stringify(postObj));
      console.log('localStorage posts ' + localStorage.getItem("userPosts"));
    } else{
      console.log('adding new post in localstorage - ' + this.txtPost);
      localStorage.setItem("userPosts", JSON.stringify({'postArray':[{ 'txtPost': this.txtPost}]}));
    } 
*/
    //
    let post = {} as Post;
    let currentUser = this.dataShareService.getCurrentUser();
    post.userId = currentUser['userId'];//this.dataShareService.getCurrentUserId();
    post.districtId = this.dataShareService.getCurrentDistrictId();
    post.postText = this.txtPost;

    if(this.parentPost != null){
      console.log("parent post " + this.parentPost.postText + ", post id " + this.parentPost.id);
      post.parentPostId = this.parentPost.id;    
    }
    
    this.postService.postComment(post)
    .subscribe((result) => {
      console.log("post message response " + result);
    });

    if(this.parentPost != null){
       this.postEvent.emit(null);           

       this.hideInput = true; // should be inside subscribe()
    }else{
      this.txtPost = '';
    }  


  }
}