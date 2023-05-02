import { useFormContext } from 'react-hook-form';

import { RangeInput, RangeMarks, StyledSlider } from './slider.styles';
import { useEffect } from 'react';

type Props = {
  name?: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  marks?: {
    start: string;
    end: string;
  };
};
export const Slider = (props: Props) => {
  const { name, id, min, max, step, marks } = props;
  const { register, getValues } = useFormContext();

  return (
    <StyledSlider>
      <RangeInput
        min={min}
        max={max}
        step={step}
        type="range"
        {...register(name, {
          valueAsNumber: true,
        })}
      />
      {marks && (
        <RangeMarks>
          <span>{marks.start}</span>
          <span>{marks.end}</span>
        </RangeMarks>
      )}
    </StyledSlider>
  );
};
