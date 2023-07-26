import { User } from '.';

export interface Decision {
  status: string;
  date: Date;
  byUser: User;
  message: string;
}

export interface UpdateDecision {
  status: number;
  message: string;
}
