import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input, InputBtn, SpanErrorInput, SpanTitle } from './TopUpFormStyle';

export type Inputs = {
  amount: string;
};

export const TopUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<Inputs> = (date) => {
    console.log(date);
    reset();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <SpanTitle>Amount (AGC):</SpanTitle>
          <Input
            type="number"
            placeholder="Count AGC"
            {...register('amount', {
              required: 'Enter the amount to top up your balance.',
              min: {
                value: 1,
                message: 'Minimum top up amount 1 AGC.',
              },
              max: {
                value: 999,
                message: 'Maximum amount of recharge 999 ACG',
              },
            })}
          />
          {errors.amount && <SpanErrorInput>{errors.amount.message}</SpanErrorInput>}
        </label>
        <InputBtn type="submit" value="Send">
          Send
        </InputBtn>
      </Form>
    </div>
  );
};
