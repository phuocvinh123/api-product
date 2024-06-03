import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Logo from './Feature/Logo/Logo';
import SearchProduct from './Feature/Search/SearchProduct';
import Category from './Feature/CategoryBar/Category';
import About from './Feature/About/About';
import Banner from './Feature/Banner/Banner';
import styled from 'styled-components';
import SideBar from './Feature/SideBar/SideBar';
import ProductList from './Feature/ProductList/ProductList';
import Pagination from './Feature/Pagenation/Pagination';
import { useProductSlice } from 'slices';
import { useEffect, useState } from 'react';
import IProduct from 'types/IProduct';

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
`;
const ProductShow = styled.div``;
export const HomePage: React.FC = () => {
  const [stateData, setStateData] = useState<Array<IProduct>>();
  const { products, pagination, filter, fetch } = useProductSlice();

  useEffect(() => {
    fetch({
      page: 1,
      limit: pagination.limit,
      search: filter.search,
      category: filter.search,
    });
  }, []);

  useEffect(() => {
    if (products) {
      setStateData(products);
    }
  }, [products]);
  const handlChangPage = (pageSelect) => {
    fetch({
      page: pageSelect,
      limit: pagination.limit,
      search: filter.search,
      category: filter.category,
    });
  };

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="HomePage" />
      </Helmet>
      <Logo />
      <SearchProduct />
      <Category />
      <About />
      <Banner />
      <MainContent>
        <SideBar />
        <ProductShow>
          {stateData && <ProductList products={stateData} />}
          {!!pagination.totalProducts && (
            <Pagination
              total={pagination.totalProducts}
              pageSize={pagination.limit}
              current={pagination.currentPage}
              onChange={handlChangPage}
            />
          )}
        </ProductShow>
      </MainContent>
    </>
  );
};
