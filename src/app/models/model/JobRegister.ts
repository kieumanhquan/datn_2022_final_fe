import {Job} from "./Job";
import {User} from "./User";
import {StatusJobRegister} from "./StatusJobRegister";

export interface JobRegister{
  id: number;
  job: Job;
  user: User;
  dateRegister: Date;
  dateInterview: Date;
  methodInterview: string;
  addressInterview: string;
  statusJobRegister: StatusJobRegister;
  cv: string;
  mediaType: string;
  reason: string;
  delete: boolean;
}
