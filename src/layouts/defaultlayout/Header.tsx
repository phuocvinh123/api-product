import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ArrowDown from './assets/arrow-down.svg';
import devices from 'styles/device';
import Container from 'components/Container/Container';
import { translations } from 'locales/translations';
import { useAuth } from 'slices';
import { setLocalStorage, STORAGE } from 'utils/storage';
import { Modal } from 'antd';
import { log } from 'console';
import { UserOutlined } from '@ant-design/icons';

const HeaderStyled = styled.header`
  padding-top: 26px;

  & > div {
    display: flex;
    justify-content: right;
  }
`;

const UlStyled = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 35px;
  li {
    list-style: none;
  }
  .button-languages {
    position: absolute;
    display: flex;
    flex-direction: column;
    display: none;

    button {
      padding: 8px 10px;
      border-bottom: 1px solid #ccc;
      width: 170px;
      border: 1px solid #cfbcbc;
      background: none;
      color: ${(p) => p.theme.primary};
      font-size: 1.2rem;
      font-weight: 500;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .hi-account {
    color: ${(p) => p.theme.primary};
    font-size: 1.2rem;
    font-weight: 500;
  }
  .link-languages {
    color: ${(p) => p.theme.primary};
    font-size: 1.2rem;
    font-weight: 500;
    align-items: center;
    gap: 7px;
    padding: 8px 0;
    transition: all 0.2s linear;
    &:hover {
      cursor: pointer;
    }
    &:hover .button-languages {
      display: flex;
    }
  }

  @media ${devices.tablet} {
    width: 100%;
  }
`;

const AnchorStyled = styled(NavLink)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(p) => p.theme.primary};
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 0;
  transition: all 0.2s linear;
  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }
`;

const ButtonLanguageStyled = styled.button`
  &.active {
    background-color: ${({ theme }) => theme.primary};
    color: #ffffff;
  }
`;

const ButtonChangeLanguageStyled = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const ButtonLogoutStyled = styled.button`
  border: none;
  background: none;
  color: ${(p) => p.theme.primary};
  font-size: 1.1rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const languages = [
  { code: 'jp', lng: 'Japan' },
  { code: 'vi', lng: 'Việt Nam' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const { home } = translations;
  const { authenticated, user_profile, logout } = useAuth();
  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLocalStorage(STORAGE.LANGUAGE, lng);
  };
  const handleLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Do you confirm Logout ?',
      icon: (
        <UserOutlined
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      ),
      okType: 'danger',
      okText: 'Logout',
      onOk: () => logout(),
    });
  };
  return (
    <HeaderStyled>
      <Container>
        <UlStyled>
          <li>
            <AnchorStyled className="hover-link" to="">
              {t(home.HEADER.HOME)}
            </AnchorStyled>
          </li>
          <li>
            <AnchorStyled className="hover-link" to="/chat">
              {t(home.HEADER.CHAT)}
            </AnchorStyled>
          </li>
          {!authenticated && !user_profile ? (
            <>
              <li>
                <AnchorStyled className="hover-link" to="/login">
                  {t(home.HEADER.LOGIN)}
                </AnchorStyled>
              </li>
              <li>
                <AnchorStyled className="hover-link" to="/register">
                  {t(home.HEADER.REGISTER)}
                </AnchorStyled>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLogoutStyled onClick={handleLogout}>
                  {t(home.HEADER.LOGOUT)}
                </ButtonLogoutStyled>
              </li>
              <li className="link-languages">
                <ButtonChangeLanguageStyled className="hover-link">
                  {t(home.HEADER.LANGUAGE)} <img src={ArrowDown} alt="" />
                </ButtonChangeLanguageStyled>

                <div className="button-languages">
                  {languages.map((lng) => (
                    <ButtonLanguageStyled
                      key={lng.code}
                      onClick={() => handleChangeLanguage(lng.code)}
                      className={`${i18n.language === lng.code ? 'active' : ''}`}
                    >
                      {lng.lng}
                    </ButtonLanguageStyled>
                  ))}
                </div>
              </li>
            </>
          )}
        </UlStyled>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
