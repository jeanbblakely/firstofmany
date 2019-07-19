import { Experience } from './experience';

export class Category {
  name: string;
  experiences: Experience[];

  constructor(name: string, experiences: Experience[]) {
    this.name = name;
    this.experiences = experiences;
  }
}
