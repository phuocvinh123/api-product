import styled from 'styled-components';
import devices from 'styles/device';

const LogoStyled = styled.div`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: calc(49 / 36);
  margin-bottom: 20px;
  text-transform: uppercase;

  @media ${devices.mobile} {
    font-size: 1.8rem;
  }
`;
const Logo: React.FC = () => {
  return <LogoStyled>LOGO</LogoStyled>;
};
export default Logo;
