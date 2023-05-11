import { PropsWithChildren } from 'react';
import { SubmitHandler, FormProvider, DeepPartial, UseFormReturn } from 'react-hook-form';

import { FormItem } from './components/form-item/form-item';

type BaseProps<T> = {
  form: UseFormReturn<T>;
  onFinish: (values: T) => void;
  name: string;
  initialValues: DeepPartial<T>;
  id: string;
};
type Props<T> = PropsWithChildren<BaseProps<T>>;

export const Form = <T,>(props: Props<T>) => {
  const { children, form, onFinish, name, id } = props;
  const { handleSubmit } = form;

  const submitHandler: SubmitHandler<T> = (values) => {
    onFinish(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} name={name} id={id}>
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
};

Form.Item = FormItem;
