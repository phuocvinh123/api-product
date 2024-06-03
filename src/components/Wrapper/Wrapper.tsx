import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  margin: 0 auto;
  max-width: 1360px;
  background-color: white;
`;
const Wrapper = ({ children }: PropsWithChildren) => {
  return <WrapperStyled>{children}</WrapperStyled>;
};

export default Wrapper;
