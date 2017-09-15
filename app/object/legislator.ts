export class Legislator {
             public first_name: string;
             public committees: Array<JSON>;
    constructor(
         public bioguide_id: string,
         public birthday:Date,
         public chamber: string,
         public contact_form: string,
         public crp_id: string,
         public district:number,
         public facebook_id: string,
         public fax: string,
         public fec_ids:string[],
         first_name,
         public gender: string,
         public govtrack_id: string,
         public icpsr_id:number,
         public in_office:boolean,
         public last_name: string,
         public leadership_role: string,
         public middle_name: string,
         public name_suffix: string,
         public nickname: string,
         public oc_email: string,
         public ocd_id: string,
         public office: string,
         public party: string,
         public phone: string,
         public state: string,
         public state_name: string,
         public term_end:Date,
         public term_start:Date,
         public thomas_id: string,
         public title: string,
         public twitter_id: string,
         public votesmart_id: string,
         public website: string,
         public youtube_id: string,
         public bioguideImageUrl,
         committees

        /*
         "bioguide_id":"J000294",
         "birthday":"1970-08-04",
         "chamber":"house",
         "contact_form":null,
         "crp_id":"N00033640",
         "district":8,
         "facebook_id":"RepHakeemJeffries",
         "fax":null,
         "fec_ids":[  
            "H2NY10092"
         ],
         "first_name":"Hakeem",
         "gender":"M",
         "govtrack_id":"412561",
         "icpsr_id":21343,
         "in_office":true,
         "last_name":"Jeffries",
         "leadership_role":null,
         "middle_name":"S.",
         "name_suffix":null,
         "nickname":null,
         "oc_email":"Rep.Jeffries@opencongress.org",
         "ocd_id":"ocd-division/country:us/state:ny/cd:8",
         "office":"1607 Longworth House Office Building",
         "party":"D",
         "phone":"202-225-5936",
         "state":"NY",
         "state_name":"New York",
         "term_end":"2019-01-03",
         "term_start":"2017-01-03",
         "thomas_id":"02149",
         "title":"Rep",
         "twitter_id":"RepJeffries",
         "votesmart_id":55285,
         "website":"http://jeffries.house.gov",
         "youtube_id":null
        */
        ){}

    public getFirstName():string{
       return this.first_name;
    }

    getLastName():string{
       return this.last_name;
    }
}