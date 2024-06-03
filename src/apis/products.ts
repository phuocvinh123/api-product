import IPageData from 'types/pageData';
import AxiosClient from './axiosClient';
import END_POINT from './endpoint';
import ICreateData from 'types/createData';
import IUpdateData from 'types/uodateData';
const getAll = (params: IPageData) => {
  return AxiosClient.get(END_POINT.PRODUCT.GET_ALL, { params });
};

const create = (body: ICreateData) => {
  return AxiosClient.post(END_POINT.PRODUCT.CREATE, body);
};

const update = (id: string, body: IUpdateData) => {
  console.log(END_POINT.PRODUCT.UPDATE + '/' + { id });

  return AxiosClient.patch(END_POINT.PRODUCT.UPDATE + `/${id}`, body);
};

const deleteProduct = (id: string) => {
  return AxiosClient.delete(END_POINT.PRODUCT.DELETE + `/${id}`);
};

const deleteMany = (ids: string[]) => {
  return AxiosClient.delete(END_POINT.PRODUCT.DELETE_MANY, { data: { ids } });
};
export { getAll, create, update, deleteProduct, deleteMany };
