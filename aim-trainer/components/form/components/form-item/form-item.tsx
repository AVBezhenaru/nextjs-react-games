import {
  Children,
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { FieldValues, Path } from 'react-hook-form';

import { FormItemLabel, StyledFormItem } from './form-item.styles';

type Props = PropsWithChildren<{
  label: string;
  name: string;
}>;

export const FormItem = (props: Props) => {
  const { label, name, children } = props;

  const [id, setId] = useState<string>();

  useEffect(() => {
    setId(nanoid());
  }, []);

  const newChildren = Children.map(children, (child) => {
    return cloneElement(child as ReactElement, { name, id });
  });

  return (
    <StyledFormItem>
      <FormItemLabel htmlFor={id}>{label}</FormItemLabel>
      {newChildren}
    </StyledFormItem>
  );
};
