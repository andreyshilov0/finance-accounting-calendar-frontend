export interface IUserFormEmail {
  email: string;
}

export interface IUserFormAuth extends IUserFormEmail {
  password: string;
}

export interface ISignInResponseData {
  token: string;
  user: IUserFormEmail;
}

export interface ISignInUserMutation {
  signInUser: ISignInResponseData;
}

export interface IRenderUserEmail {
  user: {
    email: string;
  };
}
