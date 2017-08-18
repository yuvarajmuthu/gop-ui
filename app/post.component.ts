import {Component, OnInit} from '@angular/core';

import {BannerGPXComponent} from './banner.component';
import {PostService} from './service/post.service';
import {Post} from './object/post';
import {NewPostGPX} from './newPost';

@Component({
  selector: 'post-gpx',
  templateUrl: 'app/view/post.html',
  directives: [BannerGPXComponent, NewPostGPX],
  providers:[PostService],
  styles: [`
    .post{
      margin: 5px;
      padding: 5px; 
      border-bottom: 1px solid lightgreen;
      border-radius: 5px;
      overflow: auto;
    }

    .smTagImg{
      max-width: 100%;
      height: auto;
    }

    .postDetail{
      border: 1px solid lightblue;
      border-radius: 5px;

    }

    .postText{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin:0.5em;
    }

    .postAction{
      margin:0.5em;
    }
  `]
})

export class PostGPX  implements OnInit{

  resultop:any;
  posts:Post[] = [];
  //post = {};
  
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    console.log("ngOnInit()");
    //if (!this.legislator) {
      //let id = +this._routeParams.get('id');
      //this._heroService.getHero(id).then(legislator => this.legislator = legislator);

          //this.postService.getPost()
           //         .subscribe(hero => this.posts = hero);
           this.posts = this.postService.getPost();

          /*
          .subscribe((result) => {
            this.posts = result;
                for (var i = 0; i < this.posts.length; i++) {
        console.log('reading userName - ' + this.posts[i].userName);
        console.log('reading txtPost - ' + this.posts[i].txtPost);

    }
             
            },
            (error) => {
              console.log('error captured - ' + error);
            });
            */
            


    //}

  }
}