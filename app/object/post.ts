export class Post {
	constructor(
		public id:string,
		public parentPostId:string,		
		public userId: string,
		public postText: string,
		public postType:string,
		public imageUrl:string,
		public videoUrl:string,
		public districtId:string,
		public likedBy:string[],
		public likedByCurrentUser:boolean
	){}

	static decodePost(json: JSON): Post {
	  return {
	    id:    json["_id"],
	    parentPostId: json["parent_post_id"],
	    userId:     json["userId"],
	    postText: json["postText"],
	    postType:    json["postType"],
	    imageUrl:    json["imageUrl"],
	    videoUrl:    json["videoUrl"],
	    districtId:    json["districtId"]
	    //,likedBy:json["likedBy"],
	    //likedByCurrentUser:json["likedByCurrentUser"]
	    ,likedBy:["u00l"],
	    likedByCurrentUser:true
	  };
	}
}	

interface PostJSON {
	id:string;
	userName: string;
	txtPost: string;
}