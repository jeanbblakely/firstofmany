import { Category } from './category';
import { Experience } from './experience';


export class User {
  id: any;
  username: string;
  password: string;
  email: string;
  name: string;
  birthdate: any;
  gender: string;
  tracked_info: Category[];
}
