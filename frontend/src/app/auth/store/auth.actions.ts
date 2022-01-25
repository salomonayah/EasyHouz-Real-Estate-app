import { User } from '../model/auth.model';

export class SetIsLoggedIn {
  static readonly type = '[Auth] set is logged In';
  constructor(public payload: boolean) { }
}

export class SetUserData {
  static readonly type = '[Auth] set user data';
  constructor(public payload: User | null) { }
}
