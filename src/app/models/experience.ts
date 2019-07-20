export class Experience {
  name: string
  note: string;
  img: any;
  datestamp: any;
  favorite: boolean = false; 

  constructor(name: string, note: string = '', datestamp: string = '', favorite: boolean = false) {
    this.name = name;
    this.note = note;
    this.datestamp = datestamp;
    this.favorite = favorite;
  }
}
