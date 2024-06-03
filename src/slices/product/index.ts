import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from './types';
import IPageData from 'types/pageData';
import { saga } from './saga';
import { useDispatch, useSelector } from 'react-redux';
import { DataCreate } from 'types/createData';
import { DataUpdate } from 'types/updateData';
import { selectProduct } from './selector';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
export const initialStatePageData: IPageData = {
  page: 1,
  limit: 6,
  search: '',
  category: '',
};
export const initialState: ProductState = {
  products: [],
  pagination: {
    currentPage: 0,
    totalProducts: 0,
    totalPage: 0,
    limit: 6,
  },
  filter: {
    search: '',
    category: '',
  },
};
const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetch(state, action: PayloadAction<IPageData>) {},
    fetchSuccess(state, action: PayloadAction<ProductState>) {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.filter = action.payload.filter;
    },
    create(state, action: PayloadAction<DataCreate>) {},
    update(state, action: PayloadAction<DataUpdate>) {},
    deletePro(state, action: PayloadAction<string>) {},
    deleteManyPro(state, action: PayloadAction<string[]>) {},
  },
});
export const { actions, reducer } = slice;
export const useProductSlice = () => {
  const { actions, name, reducer } = slice;
  useInjectReducer({ key: name, reducer });
  useInjectSaga({ key: slice.name, saga });
  const dispatch = useDispatch();
  const state = useSelector(selectProduct);
  const fetch = (payload: IPageData) => dispatch(actions.fetch(payload));
  const create = (payload: DataCreate) => dispatch(actions.create(payload));
  const update = (payload: DataUpdate) => dispatch(actions.update(payload));
  const deletePro = (payload: string) => dispatch(actions.deletePro(payload));
  const deleteManyPro = (payload: string[]) =>
    dispatch(actions.deleteManyPro(payload));
  return {
    fetch,
    create,
    update,
    deletePro,
    deleteManyPro,
    ...state,
  };
};
export default slice;
