import { BaseResponse, Permission } from '..';

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  Permission: Permission;
}

export interface UserObject extends BaseResponse {
  data: User;
}

export interface Users extends BaseResponse {
  data: User[];
}
