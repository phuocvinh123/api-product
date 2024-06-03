import styled from 'styled-components';
import Container from 'components/Container/Container';
import AmexPayment from './assets/amex.png';
import JcbPayment from './assets/jcb.png';
import PaypalPayment from './assets/paypal.png';
import VisaPayment from './assets/visa.png';
import devices from 'styles/device';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const FooterStyled = styled.footer`
  padding-bottom: 50px;

  .payment {
    &-images {
      display: flex;
      align-items: center;
      gap: 18px;
    }
  }

  @media ${devices.mobile} {
    padding-bottom: 5px;
  }
`;

const FooterMenuStyled = styled.div`
  border-top: 1px solid ${({ theme }) => theme.textDisable};
  padding-top: 43px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${devices.mobile} {
    padding-top: 0;
    grid-template-columns: repeat(1, 1fr);
    border-top: unset;
    gap: 0;
  }
`;

const FooterItemStyled = styled.div`
  @media ${devices.tablet} {
    &:nth-child(3) {
      grid-column: 1 / 3;
      text-align: center;
    }
  }

  @media ${devices.mobile} {
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.primary};
    padding-top: 40px;

    &:nth-child(3) {
      grid-column: unset;
    }
  }
`;

const FooterTitleStyled = styled.div`
  font-weight: 700;
  line-height: calc(19 / 14);
  margin-bottom: 20px;
`;

const LiStyled = styled.li`
  list-style: none;
  margin-bottom: 20px;
  line-height: calc(16 / 12);
  color: ${({ theme }) => theme.textDisable};
  text-align: justify;
  .hover-link {
    color: ${(p) => p.theme.textDisable};
  }
`;

const PaymentImagesStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media ${devices.tablet} {
    display: flex;
    justify-content: center;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const { home } = translations;
  return (
    <FooterStyled>
      <Container>
        <FooterMenuStyled>
          <FooterItemStyled>
            <FooterTitleStyled>
              {t(home.FOOTER.INQUIRY.TITLE)}
            </FooterTitleStyled>
            <ul>
              <LiStyled>
                <a className="hover-link" href="/">
                  {t(home.FOOTER.INQUIRY.NEWS)}
                </a>
              </LiStyled>
              <LiStyled>
                <a className="hover-link" href="/">
                  {t(home.FOOTER.INQUIRY.COMPANY_OVERVIEW)}
                </a>
              </LiStyled>
              <LiStyled>
                <a className="hover-link" href="/">
                  {t(home.FOOTER.INQUIRY.TERMS_OF_USE)}
                </a>
              </LiStyled>
              <LiStyled>
                <a className="hover-link" href="/">
                  {t(home.FOOTER.INQUIRY.COMMERCIAL_TRANSACTIONS)}
                </a>
              </LiStyled>
              <LiStyled>
                <a className="hover-link" href="/">
                  {t(home.FOOTER.INQUIRY.PRIVACY_POLICY)}
                </a>
              </LiStyled>
            </ul>
          </FooterItemStyled>
          <FooterItemStyled>
            <FooterTitleStyled className="footer-title">
              {t(home.FOOTER.SAFETY_INITIATIVES.TITLE)}
            </FooterTitleStyled>
            <ul>
              <LiStyled>{t(home.FOOTER.SAFETY_INITIATIVES.ARTICLE_1)}</LiStyled>
              <LiStyled>{t(home.FOOTER.SAFETY_INITIATIVES.ARTICLE_2)}</LiStyled>
            </ul>
          </FooterItemStyled>
          <FooterItemStyled>
            <FooterTitleStyled className="footer-title">
              {t(home.FOOTER.PAYMENT_METHOD.TITLE)}
            </FooterTitleStyled>
            <ul>
              <LiStyled>{t(home.FOOTER.PAYMENT_METHOD.DESC)}</LiStyled>
              <li className="payment">
                <PaymentImagesStyled>
                  <img src={AmexPayment} alt="" />
                  <img src={JcbPayment} alt="" />
                  <img src={PaypalPayment} alt="" />
                  <img src={VisaPayment} alt="" />
                </PaymentImagesStyled>
              </li>
            </ul>
          </FooterItemStyled>
        </FooterMenuStyled>
      </Container>
    </FooterStyled>
  );
};

export default Footer;
