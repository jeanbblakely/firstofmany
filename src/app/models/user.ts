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
  new_user: true;
  security_question: string;
  security_answer: string;
  tracked_categories: Category[];
}
