import { Permission } from '.';

export interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserDetail extends User {
  permission: Permission;
}
