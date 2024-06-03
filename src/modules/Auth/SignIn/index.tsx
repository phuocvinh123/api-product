import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styled from 'styled-components';
import Input from 'components/Input/Input';
import { Button } from 'components/Button';
import CheckBox from 'components/CheckBox/CheckBox';
import { useAuth } from 'slices';

export interface FormDataLogin {
  email: string;
  password: string;
  accept: boolean;
}
export interface LoginData {
  email: string;
  password: string;
}
export const account = {
  email: 'vietlong@gmail.com',
  password: '123123',
};
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
  email: yup.string().required('Vui lòng nhập Email!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu!')
    .min(6, 'Password lớn hơn 6 ký tự'),
  accept: yup
    .boolean()
    .oneOf([true], 'Bạn phải chấp nhận các điều khoản và điều kiện')
    .required(),
});

const initialValues: FormDataLogin = {
  email: '',
  password: '',
  accept: false,
};
export const SignIn: React.FC = () => {
  const { login } = useAuth();
  const methods = useForm<FormDataLogin>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    reValidateMode: 'onSubmit',
  });
  const onSubmit = (data: FormDataLogin) => {
    try {
      login({ email: data.email, password: data.password });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <FormProvider {...methods}>
      <FormComponent>
        <Input name="email" label="Email" />
        <Input label="Password" name="password" type="password" />
        <CheckBox name="accept" content={'Please confirm !'} />
        <Button block type="primary" onClick={methods.handleSubmit(onSubmit)}>
          Login
        </Button>
      </FormComponent>
    </FormProvider>
  );
};
