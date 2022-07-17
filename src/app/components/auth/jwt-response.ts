export class JwtResponse {

  token: string;
  type: string;
  username: string;
  role: string;

  constructor(token: string, type: string, username: string) {
    this.token = token;
    this.type = type;
    this.username = username;
    this.role = "USER";
  }
}
