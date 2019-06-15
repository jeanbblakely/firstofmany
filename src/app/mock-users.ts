import { User } from './models/user';


export const USERS: User[] = [
     {
      username: "user",
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
    },
    
      {
      username: "jblakely",
      password: "blackcat",
      email: "jeanbblakely@gmail.com",
      name: "Jeannie Blakely",
      birthdate: "4/28/1969",
      gender: "female",
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
    }

];
