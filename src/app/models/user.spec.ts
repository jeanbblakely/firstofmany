import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should return user id with user', () => {
    var user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      security_question: "Who are you?",
      security_answer: "me",
      new_user: true,
      tracked_categories: [
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
    expect(user.id).toEqual("5d045ecaece2003576f60b8e");
  });

  it('should return username and password with user', () => {
    var user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      security_question: "Who are you?",
      security_answer: "me",
      new_user: true,
      tracked_categories: [
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
    expect(user.password).toEqual("password");
  });

  it('should return user name, email, birthdate and gender with user', () => {
    var user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      security_question: "Who are you?",
      security_answer: "me",
      new_user: true,
      tracked_categories: [
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

    expect(user.name).toEqual("Boo Berry");
    expect(user.email).toEqual("user@example.com");
    expect(user.birthdate).toEqual("1/1/1990");
    expect(user.gender).toEqual("female");

  });

    it('should return user tracked_categories with mockuser', () => {  
    var user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "User",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      security_question: "Who are you?",
      security_answer: "me",
      new_user: true,
      tracked_categories: [
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
    expect(user.tracked_categories[0].name).toEqual("Thrills");
    expect(user.tracked_categories[0].experiences[1].name).toEqual("Bungee Jumping");
    expect(user.tracked_categories[1].experiences[1].name).toEqual("Red Pepper");
  });
});
