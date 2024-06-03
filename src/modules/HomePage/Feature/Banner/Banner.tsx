import Container from 'components/Container/Container';
import styled from 'styled-components';
import devices from 'styles/device';
import Banner1 from '../../../../assets/images/banner1.png';
import Banner2 from '../../../../assets/images/banner2.png';

const BannerStyled = styled.div`
  margin: 30px 0;

  & > div {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 130px;
    gap: 32px;
  }

  @media ${devices.mobile} {
    margin-top: 15px;
    margin-bottom: 12px;

    & > div {
      flex-direction: column;
      height: auto;
      gap: 11px;
      padding: 0 14px;
    }
  }
`;

const BannerImgStyled = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Banner = () => {
  return (
    <BannerStyled>
      <Container>
        <BannerImgStyled src={Banner1} alt="" />
        <BannerImgStyled src={Banner2} alt="" />
      </Container>
    </BannerStyled>
  );
};

export default Banner;
