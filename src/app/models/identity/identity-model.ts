import { BaseResponse } from '../common/base-response';

export interface IdentityModel {
  userId: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
  expireTime: Date;
}

export interface IdentityResponse extends BaseResponse {
  data: IdentityModel;
}
