import {User} from './User';
import {Type} from './Type';
import {Job} from './Job';

export interface Notifications{
  id: number;
  sender: User;
  receiver: User;
  createDate: Date;
  job: Job;
  content: string;
  type: Type;
  delete: boolean;
}
