export interface IdentityModel {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expireTime: Date;
}

export interface IdentityResponse {
  data: IdentityModel;
}
