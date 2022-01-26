import { Action, Selector, State, StateContext } from '@ngxs/store';

import { User } from '../model/auth.model';
import { SetIsLoggedIn, SetUserData } from './auth.actions';

export interface AuthStateModel {
  isLoggedIn: boolean;
  userData: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isLoggedIn: false,
    userData: null
  },
})
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static userData(state: AuthStateModel): User | null {
    return state.userData;
  }

  @Action(SetIsLoggedIn)
  setIsLoggedIn(ctx: StateContext<AuthStateModel>, { payload }: SetIsLoggedIn): void {
    ctx.patchState({
      isLoggedIn: payload
    });
  }

  @Action(SetUserData)
  setUserData(ctx: StateContext<AuthStateModel>, { payload }: SetUserData): void {
    ctx.patchState({ userData: payload });
  }
}
