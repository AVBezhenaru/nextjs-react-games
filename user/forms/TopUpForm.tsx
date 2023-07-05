import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input, InputBtn } from './TopUpFormStyle';

export type Inputs = {
  amount: string;
};

export const TopUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (date) => {
    console.log(date);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span style={{ fontSize: '14px' }}>Amount (AGC):</span>
          <Input type="text" placeholder="Count AGC" {...register('amount')} />
          {errors.amount && <p>{errors.amount.message}</p>}
        </label>
        <InputBtn type="submit" value="Send">
          Send
        </InputBtn>
      </Form>
    </div>
  );
};
