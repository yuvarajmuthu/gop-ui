export class Post {
	constructor(
		public id:number,
		public userName: string,
		public txtPost: string
	){}

	static decodePost(json: Post): Post {
	  return {
	    id:    json.id,
	    userName:     json.userName,
	    txtPost: json.txtPost
	  };
	}
}	

interface PostJSON {
	id:number;
	userName: string;
	txtPost: string;
}