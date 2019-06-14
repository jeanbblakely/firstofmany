import { Experience } from './experience';

describe('Experience', () => {
  
  
  it('should create an instance', () => {
    expect(new Experience()).toBeTruthy();  
  });
  
  it('should return a name', () => {
    var experience: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    expect(experience.name).toEqual('Sky Diving');
  });
  
  it('should return false for favorite', () => {
    var experience: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    expect(experience.favorite).toEqual(false);
  });
  
  it('should return content for note', () => {
    var experience: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    expect(experience.note).toEqual("So fun");
  });
  
  it('should return content for img', () => {
    var experience: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    expect(experience.img).toEqual('img.jpg');
  });
  
   it('should return content for datestamp', () => {
   var experience: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    expect(experience.datestamp).toEqual('1/1/2019');
  });
});
