import { User } from './user';
import { Experience } from './experience';
import { Category } from './category';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
  
  it('should return user details with user', () => {  
    var user: User = {
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      tracked_info: [
        { 
        name: "Thrills",
        experiences: [
          { 
            name: "Sky Diving",
            note: "So fun",
            img: "img.jpg",
            datestamp: "1/1/2019",
            favorite: false
          },
          {
            name: "Bungee Jumping",
            note: "Disappointing",
            img: "img.jpg",
            datestamp: "1/10/2019",
            favorite: false
      
          }
         ]
        },
        { 
        name: "Vegetables",
          experiences: [
            {
              name: "Eggplant",
              note: "Yucky",
              img: "img.jpg",
              datestamp: "3/8/2019",
              favorite: false
            },
            {
              name: "Red Pepper",
              note: "Yummy",
              img: "img.jpg",
              datestamp: "1/18/2019",
              favorite: true
      
            }
          ]  
        }
      ]
    };
    expect(user.username).toEqual("User");
    expect(user.name).toEqual("Boo Berry");
    expect(user.password).toEqual("password");
    expect(user.email).toEqual("user@example.com");
    expect(user.birthdate).toEqual("1/1/1990");
    expect(user.gender).toEqual("female");
    expect(user.tracked_info[0].name).toEqual("Thrills");
    expect(user.tracked_info[0].experiences[1].name).toEqual("Bungee Jumping");
    expect(user.tracked_info[1].experiences[1].name).toEqual("Red Pepper");
  });
});
