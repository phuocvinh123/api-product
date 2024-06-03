import { Spin as BaseSpin } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Wrapper from 'components/Wrapper/Wrapper';
import { useLoading } from 'slices/loading';
import { TopHead } from 'components/TopHeader/TopHead';

const SpinStyled = styled(BaseSpin)`
  position: fixed !important;
  top: 50% !important;
  transform: translateY(-50%) !important;

  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.primary};
  }
`;

type Props = {
  children: ReactNode;
};
const DefaultLayout = (props: Props) => {
  const { loading } = useLoading();
  return (
    <SpinStyled spinning={loading}>
      <TopHead />
      <Wrapper>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </Wrapper>
    </SpinStyled>
  );
};

export default DefaultLayout;
