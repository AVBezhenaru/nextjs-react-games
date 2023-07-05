import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input, InputBtn } from './TransferAGCFormStyle';

export type Inputs = {
  amount: string;
  toAccount: string;
};

export const TransferAGCForm = () => {
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
        <label>
          <span style={{ fontSize: '14px' }}>Account to (id):</span>
          <Input type="text" placeholder="id of account" {...register('toAccount')} />
          {errors.toAccount && <p>{errors.toAccount.message}</p>}
        </label>
        <InputBtn type="submit" value="Send">
          Send
        </InputBtn>
      </Form>
    </div>
  );
};
