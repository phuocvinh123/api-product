import IProduct from 'types/IProduct';
export type Pagenation = {
  currentPage: number;
  totalProducts: number;
  totalPage: number;
  limit: number;
};
export type Filter = {
  search: string;
  category: string;
};
export type ProductState = {
  products: IProduct[];
  pagination: Pagenation;
  filter: Filter;
};
