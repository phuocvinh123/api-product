import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import devices from 'styles/device';
import IconMenu from '../../../../assets/images/icon-menubar.svg';

const CategorybarStyled = styled.div`
  @media ${devices.mobile} {
    display: none;
  }
`;

const CategoryHeadStyled = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: calc(24 / 18);
`;

const CategoryItemStyled = styled.div`
  width: max-content;
  margin-top: 19px;
`;

const CategoryTitleStyled = styled.div`
  font-weight: 700;
  margin-top: 19px;
  margin-bottom: 12px;
  line-height: calc(19 / 14);
`;

const CategoryNameStyled = styled.div`
  margin-bottom: 12px;
  line-height: calc(19 / 14);
  color: ${({ theme }) => theme.textDisable};
`;

const CategoryBar = () => {
  const { t } = useTranslation();
  const { home } = translations;

  return (
    <CategorybarStyled>
      <CategoryHeadStyled>
        <img src={IconMenu} alt="" />
        <span>{t(home.CATEGORY.TITLE)}</span>
      </CategoryHeadStyled>

      <CategoryItemStyled>
        <CategoryTitleStyled>{t(home.CATEGORY.All.TITLE)}</CategoryTitleStyled>
        <ul>
          <CategoryNameStyled>
            {t(home.CATEGORY.All.HOUSEWORK)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.All.REPAIR_ASSEMBLY)}
          </CategoryNameStyled>
          <CategoryNameStyled>{t(home.CATEGORY.All.PET)}</CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.All.SENIOR_CITIZEN)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.All.HOBBIES_LESSONS)}
          </CategoryNameStyled>
        </ul>
      </CategoryItemStyled>
      <CategoryItemStyled>
        <CategoryTitleStyled>{t(home.CATEGORY.SORT.TITLE)}</CategoryTitleStyled>
        <ul>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.ORDER_DEFAULT)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.NEW_ARRIVAL_ORDER)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.MIN_PRICE)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.MAX_PRICE)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.POPULARITY_ORDER)}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.SORT.SALES_PERFORMANCE_ORDER)}
          </CategoryNameStyled>
        </ul>
      </CategoryItemStyled>
      <CategoryItemStyled>
        <CategoryTitleStyled>
          {t(home.CATEGORY.PRICE.TITLE)}
        </CategoryTitleStyled>
        <ul>
          <CategoryNameStyled>{t(home.CATEGORY.PRICE[0])}</CategoryNameStyled>
          <CategoryNameStyled>{t(home.CATEGORY.PRICE[100])}</CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.PRICE[1000])}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.PRICE[5000])}
          </CategoryNameStyled>
          <CategoryNameStyled>
            {t(home.CATEGORY.PRICE[10000])}
          </CategoryNameStyled>
        </ul>
      </CategoryItemStyled>
    </CategorybarStyled>
  );
};

export default CategoryBar;
