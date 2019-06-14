import { Category } from './category';
import { Experience } from './experience';


export class User {
  username: string;
  password: string;
  email: string;
  name: string;
  birthdate: any;
  gender: string;
  tracked_info: Category[];
}
