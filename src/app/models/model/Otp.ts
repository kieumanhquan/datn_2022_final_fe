import {User} from './User';

export interface Otp{
  id: number;
  code: string;
  issueAt: number;
  user: User;
}
