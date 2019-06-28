import { User } from './models/user';


export const USERS: User[] = [
     {
      id: "5d14e49726d7bc9bb6a7e917",
      username: "user",
      password: "password",
      email: "user@example.com",
      name: "Beth Berry",
      birthdate: "1990-01-01",
      gender: "Female",
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
    },

      {
      id: "5d14301350579b979ea25b23",
      username: "jblakely",
      password: "blackcat",
      email: "jeanbblakely@gmail.com",
      name: "Jeannie Blakely",
      birthdate: "1969-04-28",
      gender: "Female",
      tracked_categories: [
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
      id: "5d14308b50579b979ea25b24",
      username: "fancycat",
      password: "pickle12",
      email: "daphne@gmail.com",
      name: "Daphne Cat",
      birthdate: "2015-04-29",
      gender: "Female",
      tracked_categories: [
        {
        name: "Cat Treats",
        experiences: [
          {
            name: "Friskies Liver",
            note: "Amazing",
            img: "img.jpg",
            datestamp: "2019-05-18",
            favorite: true
          },
          {
            name: "9 Lives Salmon",
            note: "Fishy",
            img: "img.jpg",
            datestamp: "2019-06-08",
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
              datestamp: "2019-03-08",
              favorite: false
            },
            {
              name: "Red Mousie",
              note: "Perfect",
              img: "img.jpg",
              datestamp: "2019-01-19",
              favorite: true

            }
          ]
        }
      ]
    }


];
