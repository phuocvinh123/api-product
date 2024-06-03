import Container from 'components/Container/Container';
import { Link } from 'components/Link';
import styled from 'styled-components';
import devices from 'styles/device';
import { useProductSlice } from 'slices';
interface ICategoryMenu {
  type: string;
  categoryName: string;
}
const categoryMenu: ICategoryMenu[] = [
  {
    type: '',
    categoryName: 'TẤT CẢ',
  },
  {
    type: 'keyboard',
    categoryName: 'BÀN PHÍM CƠ',
  },
  {
    type: 'keycap',
    categoryName: 'KEYCAP',
  },
  {
    type: 'switch',
    categoryName: 'SWITCH',
  },
];
const CategoryStyle = styled.div`
  background-color: ${({ theme }) => theme.text};
  margin-top: 33px;
  margin-bottom: 15px;
  height: 60px;

  & > * {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 700;
    list-style: none;
    font-size: 1.2rem;
  }
  & > * .activeCategory {
    color: ${({ theme }) => theme.primary};
    opacity: 0.5 !important;
  }
  @media ${devices.mobile} {
    font-size: 1rem;
    line-height: calc(14 / 10);
    margin-top: 15px;
    margin-bottom: 12px;
    height: 33px;
  }
`;
const Category: React.FC = () => {
  const { pagination, filter, fetch } = useProductSlice();
  const handleClickCategory = (data) => {
    fetch({
      page: 1,
      limit: pagination.limit,
      search: filter.search,
      category: data,
    });
  };
  return (
    <CategoryStyle>
      <Container>
        {categoryMenu.map((category: ICategoryMenu) => (
          <li
            key={category.type}
            className={`${filter.category === category.type ? 'activeCategory' : ''}`}
          >
            <Link
              to="/"
              data-type={category.type}
              className={`hover-link ${filter.category === category.type ? 'active' : ''}`}
              onClick={() => handleClickCategory(category.type)}
            >
              {category.categoryName}
            </Link>
          </li>
        ))}
      </Container>
    </CategoryStyle>
  );
};
export default Category;
