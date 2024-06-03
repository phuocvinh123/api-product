import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import Input from 'components/Input/Input';
import Radio from 'modules/HomePage/Feature/Radio/Radio';
import CheckBox from 'components/CheckBox/CheckBox';
import { Button } from 'components/Button';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from 'slices';
import IRegisterData from 'types/registerData';
export interface FormDatas {
  email: string;
  password: string;
  repassword: string;
  username: string;
  gender: string;
  address?: string;
  dob: string;
  firstname?: string;
  lastname?: string;
  code?: string;
  accept: boolean;
}
export type RegisterData = {
  email: string;
  password: string;
  username: string;
  gender: string;
  province?: string;
  dob: string;
  firstName?: string;
  lastName?: string;
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

const InlineInput = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const schema = yup.object().shape({
  email: yup.string().required('Vui lòng nhập Email!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu!')
    .min(6, 'Password lớn hơn 6 ký tự'),
  repassword: yup
    .string()
    .required('Vui lòng nhập lại Mật khẩu!')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
  username: yup.string().required('Vui lòng nhập Tên đăng nhập!'),
  dob: yup.string().required('Vui lòng chọn ngày sinh!'),
  gender: yup.string().required('Vui lòng chọn giới tính!'),
  firstname: yup.string(),
  lastname: yup.string(),
  code: yup.string(),
  address: yup.string(),
  accept: yup
    .boolean()
    .oneOf([true], 'Bạn phải chấp nhận các điều khoản và điều kiện')
    .required(),
});

const initialValues: FormDatas = {
  email: '',
  password: '',
  repassword: '',
  username: '',
  gender: '',
  address: '',
  dob: '',
  firstname: '',
  lastname: '',
  code: '',
  accept: false,
};

export const SignUp: React.FC = () => {
  // const navigate = useNavigate();
  const methods = useForm<FormDatas>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    reValidateMode: 'onSubmit',
  });
  const { register } = useAuth();
  const onSubmit = async (data: FormDatas) => {
    try {
      const dataSubmit: IRegisterData = {
        email: data.email,
        password: data.password,
        username: data.username,
        gender: data.gender,
        province: data?.address,
        dob: data.dob,
        firstName: data?.firstname,
        lastName: data?.lastname,
      };
      register(dataSubmit);
      // navigate('/login');
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormComponent>
        <Input name="email" label="Email" />
        <Input label="Password" name="password" type="password" />
        <Input label="Re-Password" name="repassword" type="password" />
        <Input label="UserName" name="username" />
        <Radio
          name="gender"
          listOption={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
          defaultValue={'Male'}
        />
        <Input label="Address" name="address" />
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          defaultValue={new Date().toISOString().substring(0, 10)}
        />
        <InlineInput>
          <Input label="FirstName" name="firstname" />
          <Input label="LastName" name="lastname" />
        </InlineInput>
        <Input label="Invite Code" name="code" />
        <CheckBox name="accept" content={'Please confirm !'} />
        <Button block type="primary" onClick={methods.handleSubmit(onSubmit)}>
          Register
        </Button>
      </FormComponent>
    </FormProvider>
  );
};
