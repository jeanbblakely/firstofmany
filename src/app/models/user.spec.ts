import { User } from './user';
import { Experience } from './experience';
import { Category } from './category';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
  
  it('should return user name', () => {
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
    
    var user: User = {
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      tracked_info: [
        { name: "Thrills",
        experiences: [
        experience1,
        experience2 ]
        },
        { name: "Scary",
        experiences: [
        experience1,
        experience2 ]
        }
      ]
    };
    expect(user.name).toEqual("Boo Berry");
  });
});
