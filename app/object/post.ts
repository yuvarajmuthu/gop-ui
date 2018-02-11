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
	    id:    json["post_id"],
	    parentPostId: json["parent_post_id"],
	    userId:     json["user_id"],
	    postText: json["txtPost"],
	    postType:    json["post_type"],
	    imageUrl:    json["image_url"],
	    videoUrl:    json["video_url"],
	    districtId:    json["district_id"],
	    likedBy:json["likedBy"],
	    likedByCurrentUser:json["likedByCurrentUser"]
	  };
	}
}	

interface PostJSON {
	id:string;
	userName: string;
	txtPost: string;
}