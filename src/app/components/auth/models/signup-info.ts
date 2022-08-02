export class SignupInfo {

  username: string;
  password: string;
  description: string;
  role: string;

  constructor(username: string, password: string, description: string, role: string) {

    this.username = username;
    this.password = password;
    this.description = description;
    this.role = role;
  }
}
