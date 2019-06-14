import { Experience } from './experience';

describe('Experience', () => {
  it('should create an instance', () => {
    expect(new Experience('Sky Diving')).toBeTruthy();
  });
  
  it('should return a name', () => {
    var experience = new Experience('Sky Diving');
    expect(experience.name).toEqual('Sky Diving');
  });
  
  it('should return false for favorite', () => {
    var experience = new Experience('Sky Diving');
    expect(experience.favorite).toEqual(false);
  });
  
  it('should return content for note', () => {
    var experience = new Experience('Sky Diving');
    experience.note = "So much fun";
    expect(experience.note).toEqual("So much fun");
  });
  
  it('should return content for img', () => {
    var experience = new Experience('Sky Diving');
    experience.img = 'img.jpg';
    expect(experience.img).toEqual('img.jpg');
  });
  
   it('should return content for datestamp', () => {
    var experience = new Experience('Sky Diving');
    experience.datestamp = '1/1/2019';
    expect(experience.datestamp).toEqual('1/1/2019');
  });
});
