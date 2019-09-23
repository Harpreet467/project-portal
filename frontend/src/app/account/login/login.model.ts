export class LoginModel {
  email: string;
  password: string;
}

export class TokenModel {
  access_token: string;
}

export class AccountDetailsModel {
  id: number;
  name: string;
  email: string;
  roles: Array<string>;
  role_token: string;
}
