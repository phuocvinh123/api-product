import { all, call, put } from 'redux-saga/effects';
import { loadingActions } from './loading';

import { errorAction } from './errors';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function* sagaCustomize(callbackAction) {
  try {
    yield put(loadingActions.setLoading(true));
    yield callbackAction();
    yield put(loadingActions.setLoading(false));
  } catch (error: AxiosError | any) {
    yield all([
      put(errorAction.setError(error)),
      put(loadingActions.setLoading(false)),
      call(toast.error, error),
    ]);
  }
}
