import styled from 'styled-components';

const Header = styled.div`
  background-color: ${(p) => p.theme.primary};
  color: ${(p) => p.theme.text};
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
`;
export const TopHead: React.FC = () => {
  return <Header>エニタイムズ安全・安心ガイド</Header>;
};
