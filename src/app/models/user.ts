import { Category } from './category';
import { Experience } from './experience';


export class User {
  tracked_info: Category[] = [];
  
  constructor(username: string,
              password: string,
              email: string,
              name: string,
              birthdate: any,
              gender: string) {}
              
    /*
  Adds Category to User object
  */
   //addCategory(category: Category[]): void {
   //   this.tracked_info.push(category);
   //}
  
}
