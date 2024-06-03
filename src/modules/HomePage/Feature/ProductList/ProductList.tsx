import styled from 'styled-components';
import IProduct from 'types/IProduct';
import ProductCard from '../ProductCard/ProductCard';
import { useState } from 'react';
import devices from 'styles/device';
import { Button } from 'components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { useProductSlice } from 'slices';
import { Modal } from 'antd';
import ModalCreate from '../Modal/ModalCreate';
const ProductListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 28px;
  column-gap: 32px;
  margin-bottom: 40px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${devices.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ProductShow = styled.div``;
const ActionsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-btn {
    height: 45px !important;
  }

  .ant-checkbox {
    & + span {
      user-select: none;
    }
  }
`;

const DeleteAllStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
type IPropProductList = {
  products: IProduct[];
};
export type IModal = {
  typeModal: '' | 'create';
};
const ProductList: React.FC<IPropProductList> = ({ products }) => {
  const methods = useForm();
  const { deleteManyPro } = useProductSlice();
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [modalState, setModalState] = useState<IModal>({
    typeModal: '',
  });
  const handleSelect = (data) => {
    if (selectedList.includes(data)) {
      const updatedList = selectedList.filter((item) => item !== data);
      setSelectedList(updatedList);
    } else {
      const updatedList = [...selectedList, data];
      setSelectedList(updatedList);
    }
  };
  const closeModal = () => {
    setModalState({ typeModal: '' });
  };
  const handleOnchangeCheckboxAll = () => {
    if (selectedList.length < products.length) {
      const listAll = products.map((product) => product._id);
      setSelectedList(listAll);
    } else {
      setSelectedList([]);
    }
  };
  const handleDeleteManyProduct = () => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Do you confirm Delete many Product ?',
      okType: 'danger',
      okText: 'Delete',
      onOk: () => deleteManyProduct(),
    });
  };
  const handleOpenModalCreate = () => {
    setModalState({ typeModal: 'create' });
  };
  const deleteManyProduct = async () => {
    try {
      await deleteManyPro(selectedList);
      closeModal();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <ProductShow>
      <ActionsStyled>
        <DeleteAllStyled>
          <FormProvider {...methods}>
            <Checkbox
              name="products-selected"
              checked={selectedList.length > 0}
              onChange={handleOnchangeCheckboxAll}
            />
          </FormProvider>
          {selectedList.length > 0 && (
            <Button type="default" onClick={handleDeleteManyProduct}>
              Xóa
            </Button>
          )}
        </DeleteAllStyled>
        <Button type="primary" onClick={handleOpenModalCreate}>
          Thêm mới
        </Button>
      </ActionsStyled>
      <ProductListStyled>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            selected={selectedList}
            onSelected={handleSelect}
          />
        ))}
      </ProductListStyled>
      <Modal open={!!modalState.typeModal} onCancel={closeModal} footer={null}>
        {modalState.typeModal === 'create' && (
          <ModalCreate closeModal={closeModal} />
        )}
      </Modal>
    </ProductShow>
  );
};
export default ProductList;
