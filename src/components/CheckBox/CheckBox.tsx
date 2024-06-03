import React, { FC } from 'react';
import { Checkbox as CheckBoxStyled } from 'antd';
import { Controller, useController, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface IProps {
  name: string;
  content: string;
  errors?: string;
  label?: string;
}

const ErrorCustom = styled.span`
  color: red;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CheckBox: FC<IProps> = ({ name, content, errors, label }) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <div className="form-group">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CheckBoxStyled
            {...field}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          >
            {content}
          </CheckBoxStyled>
        )}
      />
      {invalid && <ErrorCustom>{error?.message}</ErrorCustom>}
    </div>
  );
};

export default CheckBox;
