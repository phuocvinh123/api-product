import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { actions } from '.';
import { sagaCustomize } from 'slices/sagaCustomize';
import {
  getAll,
  create,
  update,
  deleteProduct,
  deleteMany,
} from 'apis/products';
import { ProductState } from './types';
import IPageData from 'types/pageData';
import { RootState } from 'types/RootState';
import { toast } from 'react-toastify';
export function* fetch(action: any) {
  yield sagaCustomize(function* () {
    const state: RootState = yield select();
    console.log(state);

    const response = yield call(getAll, action.payload);
    if (response.status === 'OK') {
      const dataSuccess: ProductState = {
        products: response.data,
        pagination: response.pagination,
        filter: {
          search: action.payload.search,
          category: action.payload.category,
        },
      };
      yield put(actions.fetchSuccess(dataSuccess));
    }
  });
}
export function* createProduct(action: any) {
  yield sagaCustomize(function* () {
    const response = yield call(create, action.payload);
    if (response.status === 'OK') {
      console.log(response);
      const dataPage: IPageData = {
        page: 1,
        limit: 6,
        search: '',
        category: '',
      };
      yield all([
        put(actions.fetch(dataPage)),
        call(toast.success, 'Create Success!'),
      ]);
    }
  });
}
export function* updateProduct(action: any) {
  yield sagaCustomize(function* () {
    const response = yield call(
      update,
      action.payload.id,
      action.payload.product,
    );
    if (response.status === 'OK') {
      const dataPage: IPageData = {
        page: 1,
        limit: 6,
        search: '',
        category: '',
      };
      yield all([
        put(actions.fetch(dataPage)),
        call(toast.success, 'Update Success!'),
      ]);
    }
  });
}
export function* deleteOne(action: any) {
  yield sagaCustomize(function* () {
    const response = yield call(deleteProduct, action.payload);
    if (response.status === 'OK') {
      const dataPage: IPageData = {
        page: 1,
        limit: 6,
        search: '',
        category: '',
      };
      yield all([
        put(actions.fetch(dataPage)),
        call(toast.success, 'Delete Success'),
      ]);
    }
  });
}
export function* deleteManyPro(action: any) {
  yield sagaCustomize(function* () {
    const response = yield call(deleteMany, action.payload);
    if (response.status === 'OK') {
      const dataPage: IPageData = {
        page: 1,
        limit: 6,
        search: '',
        category: '',
      };
      yield all([
        put(actions.fetch(dataPage)),
        call(toast.success, 'Delete Success'),
      ]);
    }
  });
}
export function* saga() {
  yield takeLatest(actions.fetch.type, fetch);
  yield takeLatest(actions.create.type, createProduct);
  yield takeLatest(actions.update.type, updateProduct);
  yield takeLatest(actions.deletePro.type, deleteOne);
  yield takeLatest(actions.deleteManyPro.type, deleteManyPro);
}
