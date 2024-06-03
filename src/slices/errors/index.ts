import { AxiosError } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorState } from './types';
import { selectError } from './selectors';

export const initialState: ErrorState = {
  error: null,
};

const slice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<AxiosError | any>) {
      console.log(action.payload);
      state.error = action.payload;
    },
  },
});

export const { actions: errorActionss, reducer } = slice;
export const errorAction = slice.actions;
export const useError = () => {
  const { actions, name, reducer } = slice;
  useInjectReducer({ key: name, reducer });

  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const setError = (payload: any) => dispatch(actions.setError(payload));
  return { setError, error };
};

export default slice;
