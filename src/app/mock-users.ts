import { User } from './models/user';


export const USERS: User[] = [
     {
      id: "5d045ecaece2003576f60b8e",
      username: "user",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "Female",
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
    },
    
      {
      id: "5d045f9465093635e061144d",
      username: "jblakely",
      password: "blackcat",
      email: "jeanbblakely@gmail.com",
      name: "Jeannie Blakely",
      birthdate: "4/28/1969",
      gender: "Female",
      tracked_info: [
        { 
        name: "Concerts",
        experiences: [
          { 
            name: "Kraftwerk",
            note: "Amazing",
            img: "img.jpg",
            datestamp: "5/8/2018",
            favorite: true
          },
          {
            name: "Sparks",
            note: "Brilliant",
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
    },
    
    {
      id: "5d045f9465093635e034567e",
      username: "fancycat",
      password: "pickle",
      email: "daphne@gmail.com",
      name: "Daphne Cat",
      birthdate: "4/29/2015",
      gender: "Female",
      tracked_info: [
        { 
        name: "Cat Treats",
        experiences: [
          { 
            name: "Friskies Liver",
            note: "Amazing",
            img: "img.jpg",
            datestamp: "5/8/2019",
            favorite: true
          },
          {
            name: "9 Lives Salmon",
            note: "Fishy",
            img: "img.jpg",
            datestamp: "2/10/2019",
            favorite: false
      
          }
         ]
        },
        { 
        name: "Cat Toys",
          experiences: [
            {
              name: "Ground Squirrel",
              note: "So fun",
              img: "img.jpg",
              datestamp: "3/8/2019",
              favorite: false
            },
            {
              name: "Red Mousie",
              note: "Perfect",
              img: "img.jpg",
              datestamp: "1/18/2019",
              favorite: true
      
            }
          ]  
        }
      ]
    }


];
