import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest, put, select, all } from 'redux-saga/effects';
import { login, getMe, register } from 'apis';
import { STORAGE } from 'utils/storage';
import { RootState } from 'types';

import { sagaCustomize } from '../sagaCustomize';

import { actions } from '.';
import IRegisterData from 'types/registerData';
import { toast } from 'react-toastify';
import { BROADCAST_CHANNEL } from 'constant';

export function* loginSaga({
  payload,
}: PayloadAction<{ email: string; password: string }>) {
  yield sagaCustomize(function* () {
    const response = yield call(login, payload);
    localStorage.setItem(STORAGE.USER_TOKEN, response.data.accessToken);
    const {
      broadcast: { boardcastChannel },
    }: RootState = yield select();
    if (boardcastChannel) {
      boardcastChannel.postMessage(BROADCAST_CHANNEL.LOGIN);
    }
    yield all([
      put(actions.loginSuccess()),
      call(toast.success, 'Login Success'),
    ]);
  });
}

export function* getMeSaga() {
  yield sagaCustomize(function* () {
    const response = yield call(getMe);
    yield put(actions.getMeSuccess(response.data));
  });
}
export function* registerSaga({ payload }: PayloadAction<IRegisterData>) {
  yield sagaCustomize(function* () {
    const response = yield call(register, payload);
    if (response.status === 'OK') {
      yield call(toast.success, 'Register Success');
    }
  });
}
export function* logoutSaga() {
  yield sagaCustomize(function* () {
    localStorage.removeItem(STORAGE.USER_TOKEN);
    const {
      broadcast: { boardcastChannel },
    }: RootState = yield select();
    if (boardcastChannel) {
      boardcastChannel.postMessage(BROADCAST_CHANNEL.LOGOUT);
    }
    yield all([
      put(actions.logoutSuccess()),
      call(toast.success, 'Logout Success'),
    ]);
  });
}
export function* saga() {
  yield takeLatest(actions.login.type, loginSaga);
  yield takeLatest(actions.getMe.type, getMeSaga);
  yield takeLatest(actions.register.type, registerSaga);
  yield takeLatest(actions.logout.type, logoutSaga);
}
