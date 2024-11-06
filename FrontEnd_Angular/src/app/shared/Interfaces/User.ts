export interface LoginCommand {
  login: string;
  password: string;
}
export interface RegisterUser {
  Name: string;
  Password: string;
}
export interface LoginToken {
  jwtToken: string;
  refreshToken: string;
  tokenExpiredAt: number;
}
export interface UserDetails {
  name: string;
}
