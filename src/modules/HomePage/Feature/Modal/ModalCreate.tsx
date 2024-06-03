import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Input from 'components/Input/Input';
import Radio from '../Radio/Radio';
import { useProductSlice } from 'slices';

export interface IProductCreate {
  nameProduct: string;
  category: string;
  picture: string;
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
const ButtonStyle = styled(Button)`
  height: 50px;
  margin-top: 50px;
`;
const schema = yup.object().shape({
  nameProduct: yup.string().required('Tên sản phẩm là bắt buộc!'),
  category: yup.string().required('Bạn phải chọn thương hiệu'),
  picture: yup.string().required('Bạn cần cung cấp ảnh sản phẩm'),
});
const initialValues: IProductCreate = {
  nameProduct: '',
  category: '',
  picture: '',
};

const ModalCreate: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { create } = useProductSlice();
  const methods = useForm<IProductCreate>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    reValidateMode: 'onSubmit',
  });
  const onSubmit = async (data: IProductCreate) => {
    try {
      const dataCreate = {
        title: data.nameProduct,
        imageUrl: data.picture,
        category: data.category,
        username: 'long123',
        isCertificated: true,
        saved: true,
        description: 'ahihi đồ nGốk',
        likedCount: 100,
        price: 1234,
      };
      await create(dataCreate);
      methods.reset();
      closeModal();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...methods}>
      <FormComponent>
        <Input name="nameProduct" label="Product Name" />
        <Radio
          name="category"
          listOption={[
            { label: 'Lenovo', value: 'Lenovo' },
            { label: 'Dell', value: 'Dell' },
            { label: 'HP', value: 'HP' },
          ]}
          defaultValue={'Lenovo'}
        />
        <Input label="URL Image" name="picture" />
        <ButtonStyle
          block
          type="primary"
          onClick={methods.handleSubmit(onSubmit)}
        >
          Create
        </ButtonStyle>
      </FormComponent>
    </FormProvider>
  );
};

export default ModalCreate;
