import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import devices from 'styles/device';

const ContainerStyled = styled.div`
  width: 100%;
  padding: 0 42px;

  @media ${devices.mobile} {
    padding: 0 14px;
  }
`;

const Container = ({ children, ...props }: PropsWithChildren) => (
  <ContainerStyled {...props}>{children}</ContainerStyled>
);

export default Container;
