import { Radio as RadioStyle, RadioGroupProps, RadioChangeEvent } from 'antd';
import { FC } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface IOptions {
  label: string | number;
  value: string | number;
}

interface IProps extends RadioGroupProps {
  name: string;
  listOption: IOptions[];
  defaultValue: string;
}

const ErrorCustom = styled.span`
  color: red;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Radio: FC<IProps> = ({ name, listOption, defaultValue, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <div className="form-group">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioStyle.Group
            {...field}
            {...props}
            onChange={(e: RadioChangeEvent) => onChange(e.target.value)}
          >
            {listOption.map((element) => (
              <RadioStyle
                key={element.value}
                value={element.value}
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                {element.label}
              </RadioStyle>
            ))}
          </RadioStyle.Group>
        )}
      />
      {error && <ErrorCustom>{error.message}</ErrorCustom>}
    </div>
  );
};

export default Radio;
