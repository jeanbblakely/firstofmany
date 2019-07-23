import { Category } from './category';
import { Experience } from './experience';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category('test', [])).toBeTruthy();
  });
  
  it('should return a name', () => {
    var experience1: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    var experience2: Experience = {
      name: "Bungee Jumping",
      note: "Disappointing",
      img: "img.jpg",
      datestamp: "1/10/2019",
      favorite: false
      
    };
    var category: Category = {
      name: "Thrills",
      experiences: [
        experience1,
        experience2
      ]
    }
    expect(category.name).toEqual("Thrills");
  });
  
  it('should return a experience details', () => {
    var experience1: Experience = {
      name: "Sky Diving",
      note: "So fun",
      img: "img.jpg",
      datestamp: "1/1/2019",
      favorite: false
    };
    var experience2: Experience = {
      name: "Bungee Jumping",
      note: "Disappointing",
      img: "img.jpg",
      datestamp: "1/10/2019",
      favorite: false
      
    };
    var category: Category = {
      name: "Thrills",
      experiences: [
        experience1,
        experience2
      ]
    }
    expect(category.experiences[0].name).toEqual("Sky Diving");
    expect(category.experiences[1].name).toEqual("Bungee Jumping");
    expect(category.experiences[0].note).toEqual("So fun");
    expect(category.experiences[1].favorite).toEqual(false);
    expect(category.experiences[0].datestamp).toEqual("1/1/2019");
    expect(category.experiences[1].img).toEqual("img.jpg");
  });
});
