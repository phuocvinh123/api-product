import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import { Button } from 'components/Button';
import IProduct from 'types/IProduct';
import { useProductSlice } from 'slices';
import { DataUpdate } from 'types/updateData';

export interface IProductUpdate {
  description: string;
  title: string;
  imageUrl: string;
}
const FormComponent = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 130px;

  .form-group {
    margin-block: 15px;
  }

  .ant-radio-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-register {
    width: 100%;
    margin-top: 40px;
  }

  .register-checkbox {
    margin-top: 10px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
`;
const schema = yup.object().shape({
  description: yup.string().required('Vui lòng nhập'),
  title: yup.string().required('Tên sản phẩm là bắt buộc!'),
  imageUrl: yup.string().required('Bạn cần cung cấp ảnh sản phẩm'),
});
type PropsEdit = {
  product: IProduct;
  closeModal: () => void;
};
const ModalEdit: FC<PropsEdit> = ({ product, closeModal }) => {
  const { update } = useProductSlice();
  const initialValues: IProductUpdate = {
    title: product.title,
    imageUrl: product.imageUrl,
    description: product.description,
  };
  const methods = useForm<IProductUpdate>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    reValidateMode: 'onSubmit',
  });
  useEffect(() => {
    if (initialValues) {
      Object.keys(initialValues).forEach((key) => {
        if (key in initialValues)
          methods.setValue(
            key as keyof IProductUpdate,
            initialValues[key as keyof IProductUpdate],
          );
      });
    }
  }, []);
  const onSubmit = async (data: IProductUpdate) => {
    const dataEdit: DataUpdate = {
      id: product._id,
      product: data,
    };

    try {
      await update(dataEdit);
      methods.reset();
      closeModal();
    } catch (error) {}
  };
  return (
    <FormProvider {...methods}>
      <FormComponent>
        <Input name="title" label="Product Name" />
        <Input name="description" label="Description" />
        <Input label="Image" name="imageUrl" />
        <Button
          block
          type="primary"
          onClick={methods.handleSubmit(onSubmit)}
          style={{ height: 50 }}
        >
          Update
        </Button>
      </FormComponent>
    </FormProvider>
  );
};

export default ModalEdit;
