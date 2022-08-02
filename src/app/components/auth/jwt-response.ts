export class JwtResponse {

  token: string;
  nickname: string;
  description: string;
  role: string;

  constructor(token: string, nickname: string, description: string, role: string) {
    this.token = token;
    this.nickname = nickname;
    this.description = description;
    this.role = role;
  }
}
