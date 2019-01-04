import {Component, OnInit, Input} from '@angular/core';

import {PostService} from './service/post.service';
import {DataShareService} from './service/dataShare.service';

import {Post} from './object/post';

import {NewPostGPX} from './newPost';
import {BannerGPXComponent} from './banner.component';
import {PostCardGPX} from './postCard.component';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'post-gpx',
  templateUrl: 'app/view/post.html',
  directives: [BannerGPXComponent, NewPostGPX, PostCardGPX],
  providers:[PostService],
  styles: [`
  `]
})

export class PostGPX  implements OnInit{
  @Input() groupId:string;
  @Input() userId:string;
  @Input() type:string;

  posts:Post[] = [];
  
  constructor(private postService: PostService, private dataShareService:DataShareService) {
    console.log("constructor() post.component");
  }

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    console.log("ngOnInit() post.component");
    let entityId:string;
    if(this.type == "group" && this.groupId){
      
      entityId=this.groupId;
    }else if(this.type == "user"){
      entityId=this.dataShareService.currentUserId;
    }

    console.log("Activities for " + entityId);
    this.getPost(entityId, this.type);

  }

  getPost(entityId:string, entityType:string):void{
    var getPostRequest = {};      
    getPostRequest["entityId"] = entityId;
    getPostRequest["entityType"] = entityType;

    this.postService.getActivities(JSON.stringify(getPostRequest)).subscribe((result) => 
    {
      this.posts = result;
      //this.reloadPost(entity, entityType);
    });    
  }

  reloadPost(entity:string, entityType:string):void{
    Observable.timer(5000).first().subscribe(()=>this.getPost(entity, entityType));
  }

/*
  comment():void{}

  likePost(post:Post):void{
    console.log('Liked the post ' + post.id);
    console.log('userid ' + this.dataShareService.getCurrentUserId());
    post.likedByCurrentUser = true;
  }  
  */
}