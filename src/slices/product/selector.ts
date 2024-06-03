import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

const selectDomain = (state: RootState) => state.product || initialState;

export const selectProduct = createSelector(
  [selectDomain],
  (product) => product,
);
