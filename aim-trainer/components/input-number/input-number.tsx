import { useFormContext } from 'react-hook-form';

import { InputNumberWrapper, StyledInputNumber } from './input-number.styles';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  id?: string;
};

export const InputNumber = (props: Props) => {
  const { min, max, step, name, id } = props;
  const { register } = useFormContext();

  return (
    <InputNumberWrapper>
      <StyledInputNumber
        type="number"
        min={min}
        max={max}
        step={step}
        {...register(name, {
          valueAsNumber: true,
        })}
        id={id}
      />
    </InputNumberWrapper>
  );
};
