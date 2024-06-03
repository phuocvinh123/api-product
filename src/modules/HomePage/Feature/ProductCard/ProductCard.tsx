import { Button } from 'components/Button';
import styled from 'styled-components';
import IconSaved from '../../../../assets/images/saved.png';
import Checkbox from 'antd/es/checkbox/Checkbox';
import IProduct from 'types/IProduct';
import { useState } from 'react';
import { Modal } from 'antd';
import ModalEdit from '../Modal/ModalEdit';
import { useProductSlice } from 'slices';

export const CardStyled = styled.div`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.textDisable};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.primary};
  }
`;
export const CardTopStyled = styled.div`
  padding: 16px;
  flex: 1;
`;
export const CardImageStyled = styled.div`
  height: 180px;
  margin-bottom: 7px;
  position: relative;
`;

export const CardImgStyled = styled.img`
  border-radius: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CertificateStyled = styled.span`
  position: absolute;
  top: 7px;
  left: -5px;
  font-weight: 700;
  font-size: 1rem;
  padding: 7px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -6.5px;
    left: 0.5px;
    border-top: 3.5px solid;
    border-right: 2.5px solid;
    border-bottom: 3.5px solid;
    border-left: 2.5px solid;
    border-color: #46760a #46760a transparent transparent;
  }
`;

export const SavedStyled = styled.span`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 100rem;
  background-color: #fff;
  width: 28px;
  height: 28px;
`;

export const CardUserStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

export const CardUserImgStyled = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 100rem;
`;

export const CardTitleStyled = styled.h2`
  font-weight: 700;
  line-height: calc(19 / 14);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const CardDescStyled = styled.p`
  font-size: 1.2rem;
  line-height: calc(16 / 12);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

export const CardBottomStyled = styled.div`
  padding: 7px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.textDisable};
`;

export const CardViewsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 100rem;
  }
`;

export const CardPriceStyled = styled.span`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: calc(24 / 18);
`;

export const CardActionsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-btn-icon-only {
    width: 32px !important;
    height: 32px !important;
    font-size: 1.6rem;
  }
`;

export const CardActionsUDStyled = styled.div`
  display: flex;
  gap: 5px;
`;

export const FormStyled = styled.form`
  .form-group {
    margin-bottom: 10px;
  }

  input {
    height: 45px;
  }

  label,
  input,
  textarea {
    font-size: 1.6rem;
  }
`;
type IPropsCard = {
  product: IProduct;
  selected: string[];
  onSelected: (id: string) => void;
};
type IModalFocus = {
  typeModal: '' | 'update' | 'delete';
  productFocus: IProduct;
};
const ProductCard: React.FC<IPropsCard> = ({
  product,
  selected,
  onSelected,
}) => {
  const [modalState, setModalState] = useState<IModalFocus>({
    typeModal: '',
    productFocus: {
      _id: '',
      imageUrl: '',
      title: '',
      description: '',
      username: '',
      isCertificated: false,
      saved: false,
      category: '',
      likedCount: 0,
      price: 0,
    },
  });
  const { deletePro } = useProductSlice();
  function handleOpenModalDelete(product: IProduct): void {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Do you confirm Delete this product ?',
      okType: 'danger',
      okText: 'Delete',
      onOk: () => deleteProduct(product),
    });
  }

  function handleOpenModalEdit(product: IProduct): void {
    setModalState({
      typeModal: 'update',
      productFocus: product,
    });
  }

  function onChangeCheckbox(_id: string) {
    onSelected(_id);
  }
  const closeModal = () => {
    setModalState({
      ...modalState,
      typeModal: '',
    });
  };
  const deleteProduct = async (product: IProduct) => {
    try {
      await deletePro(product._id);
      closeModal();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <CardStyled>
      <CardTopStyled>
        <CardActionsStyled>
          <Checkbox
            name="product-select"
            value={product._id}
            onChange={() => onChangeCheckbox(product._id)}
            checked={selected.includes(product._id)}
          />
          <CardActionsUDStyled>
            <Button type="outline" onClick={() => handleOpenModalEdit(product)}>
              Edit
            </Button>
            <Button
              type="default"
              onClick={() => handleOpenModalDelete(product)}
            >
              Delete
            </Button>
          </CardActionsUDStyled>
        </CardActionsStyled>
        <CardImageStyled>
          <CardImgStyled src={product.imageUrl} alt="" />
          {product.isCertificated && (
            <CertificateStyled>イケア家具組立認定サポーター </CertificateStyled>
          )}
          {product.saved && (
            <SavedStyled>
              <img src={IconSaved} alt="" />
            </SavedStyled>
          )}
        </CardImageStyled>

        <div className="card-product-content">
          <CardUserStyled>
            <CardUserImgStyled src={product.imageUrl} alt="" />
            <h3>{product.username}</h3>
          </CardUserStyled>

          <CardTitleStyled>{product.title}</CardTitleStyled>
          <CardDescStyled>{product.description}</CardDescStyled>
        </div>
      </CardTopStyled>
      <CardBottomStyled>
        <CardViewsStyled>
          <img src={product.imageUrl} alt="" />
          <span>{product.likedCount}</span>
        </CardViewsStyled>
        <CardPriceStyled>¥ {product.price}</CardPriceStyled>
      </CardBottomStyled>
      <Modal open={!!modalState.typeModal} onCancel={closeModal} footer={null}>
        {modalState.typeModal === 'update' && (
          <ModalEdit
            product={modalState.productFocus}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </CardStyled>
  );
};
export default ProductCard;
