class UserService {
  private _user = {
    id: 1,
    name: 'User name',
    token: '123',
  };

  public set user(user: any) {
    this._user = user;
  }

  public get user(): any {
    return this._user;
  }
}

export const userService = new UserService();
