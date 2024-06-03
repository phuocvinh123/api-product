import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
// import errorSlice from '../slices/errors';
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  return combineReducers({
    ...injectedReducers,
    // theme: themeSlice.reducer,
    // errors: errorSlice.reducer,
  });
}
