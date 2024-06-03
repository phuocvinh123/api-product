import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { UserModel } from 'models';
import { saga } from './saga';
import { AuthState } from './types';
import { selectAuth } from './selectors';
import IRegisterData from 'types/registerData';

export const initialState: AuthState = {
  loading: false,
  authenticated: false,
  user_profile: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.authenticated = true;
    },
    register(state, action: PayloadAction<IRegisterData>) {},
    getMe: (state) => {
      state.loading = true;
    },
    getMeSuccess: (state, action: PayloadAction<UserModel>) => {
      state.loading = false;
      state.authenticated = true;
      state.user_profile = action.payload;
    },
    logout: (state) => {},
    logoutSuccess: (state) => {
      state.authenticated = false;
      state.user_profile = null;
    },
  },
});

export const { actions, reducer } = slice;

export const useAuth = () => {
  const { actions, name, reducer } = slice;

  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: slice.name, saga });
  const dispatch = useDispatch();

  const login = (payload: { email: string; password: string }) =>
    dispatch(actions.login(payload));
  const getMe = () => dispatch(actions.getMe());
  const register = (payload: IRegisterData) =>
    dispatch(actions.register(payload));
  const logout = () => dispatch(actions.logout());
  const logoutSuccess = () => dispatch(actions.logoutSuccess());
  const state = useSelector(selectAuth);

  return {
    login,
    getMe,
    register,
    logout,
    logoutSuccess,
    ...state,
  };
};
export default slice;
