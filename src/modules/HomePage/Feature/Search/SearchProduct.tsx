import { Button } from 'components/Button';
import Container from 'components/Container/Container';
import { useProductSlice } from 'slices';
import { TextInput } from 'components/Form/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import devices from 'styles/device';
const ButtonStyle = styled(Button)`
  background-color: ${(p) => p.theme.primary};
  height: 40px;
  box-sizing: border-box;
  margin-inline: 20px;
  font-size: 1.2rem;
  font-weight: 500;
`;
const HeaderSearchStyled = styled.div`
  input {
    height: 42px;
    font-weight: 400;
    font-size: 1.4rem;
    color: #a9a9a9;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 27px;

    & > div {
      flex: 1;
    }
  }

  .header-input-search {
    border-color: #d1d1d1;
  }

  @media ${devices.mobile} {
    & > div {
      gap: 10px;
    }
  }
`;
const SearchArea = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 50px;
  align-items: center;
`;
const SearchProduct: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });
  const { pagination, filter, fetch } = useProductSlice();
  const onSearch = (data) => {
    fetch({
      page: 1,
      limit: pagination.limit,
      search: data.search,
      category: filter.category,
    });
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      fetch({
        page: 1,
        limit: pagination.limit,
        search: e.target.value,
        category: filter.category,
      });
    }
  };
  return (
    <HeaderSearchStyled>
      <FormProvider {...methods}>
        <Container>
          <SearchArea>
            <TextInput
              name={'search'}
              placeholder="キーワード"
              onKeyDown={handleEnter}
            />
            <ButtonStyle
              type="primary"
              onClick={methods.handleSubmit(onSearch)}
            >
              Search
            </ButtonStyle>
          </SearchArea>
        </Container>
      </FormProvider>
    </HeaderSearchStyled>
  );
};
export default SearchProduct;
