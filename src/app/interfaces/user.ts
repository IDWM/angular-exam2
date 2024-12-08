import { Gender } from './gender';

export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
  gender: Gender;
}
