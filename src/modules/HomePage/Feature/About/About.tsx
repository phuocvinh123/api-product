import { Button } from 'components/Button';
import Container from 'components/Container/Container';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import devices from 'styles/device';

const AboutStyled = styled.div`
  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  @media ${devices.mobile} {
    & > div {
      flex-direction: column;
      gap: 30px;
    }

    .btn-about {
      width: 100%;
      height: 50px;
    }
  }
`;
const ButtonStyle = styled(Button)`
  font-size: 18px;
  font-weight: 700;
  height: 80px !important;
  padding-inline: 30px;
`;

const AboutContentStyled = styled.h1`
  font-size: 1.2rem;
  max-width: 400px;
  width: 100%;
  line-height: calc(20 / 15);
  @media ${devices.tablet} {
    max-width: 650px;
  }
`;

const About = () => {
  const { t } = useTranslation();
  const { home } = translations;
  return (
    <AboutStyled>
      <Container>
        <AboutContentStyled> {t(home.SERVICE.DESC)}</AboutContentStyled>
        <ButtonStyle className="btn-about" type="outline">
          {t(home.BUTTON.LIST_OF_SERVICE)}
        </ButtonStyle>
      </Container>
    </AboutStyled>
  );
};

export default About;
