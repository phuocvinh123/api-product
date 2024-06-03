import { Input as InputStyled, InputProps } from 'antd';
import { FC, ReactNode } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const InputCustom = styled(InputStyled)`
  height: 42px;
  border: 1px solid #858585;
  font-size: 14px;
  color: #a9a9a9;
  border-radius: 5px;
  margin-top: 10px;
  &:focus,
  &:hover {
    border: solid 1px ${({ theme }) => theme.primary};
  }
`;

const ErrorCustom = styled.span`
  color: red;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

type IProps = InputProps & {
  name: string;
  label?: string;
  icon?: ReactNode;
};

const Input: FC<IProps> = ({ name, label, icon, ...props }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  const status = invalid ? 'error' : undefined;

  return (
    <div className="form-group">
      {label && (
        <label style={{ fontSize: 18, fontWeight: 500 }}>{label}</label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputCustom
            {...field}
            {...props}
            prefix={icon}
            status={status}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
      {error && <ErrorCustom>{error.message}</ErrorCustom>}
    </div>
  );
};

export default Input;
