import {Component} from '@angular/core';

@Component({
  selector: 'newPost-gpx',
  templateUrl: 'app/view/newPost.html',
  directives: [],
  providers:[],
  styles: [`
  .newPostButton{

  }

  .newPost{
    width:auto;
  }
  `]
})

export class NewPostGPX {
  txtPost:string = '';

  submitPost(){

    let posts:string;

    if(posts = localStorage.getItem("userPosts")){
      console.log('Existing posts ' + posts);
      let postObj = {};
      let json = [];  
      //json = JSON.parse(posts);
      postObj = JSON.parse(posts);
      json = postObj['postArray'];

      let post:string;
      //can also used as 
      //post = JSON.stringify({txtPost : this.txtPost});
      post = '{ "txtPost":'+ JSON.stringify(this.txtPost) +'}';
      json.push(JSON.parse(post));
      
      postObj['postArray'] = json;

      //localStorage.setItem("userPosts", JSON.stringify(json));
      localStorage.setItem("userPosts", JSON.stringify(postObj));
      console.log('localStorage posts ' + localStorage.getItem("userPosts"));
    } else{
      console.log('adding new post in localstorage - ' + this.txtPost);
      localStorage.setItem("userPosts", JSON.stringify({'postArray':[{ 'txtPost': this.txtPost}]}));
    } 
  }
}