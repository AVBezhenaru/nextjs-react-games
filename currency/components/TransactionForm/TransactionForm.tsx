import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IDataChangeAmount } from '../../types';
import { changeAmount } from '../../store/usersArraySlice';

import { Form, Input, InputBtn, SpanErrorInput, SpanTitle } from './TransactionFormStyle';

export const TransactionForm: React.FC = () => {
  const { users } = useAppSelector((state) => state.users);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IDataChangeAmount>({ mode: 'onBlur' });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IDataChangeAmount> = (data) => {
    const user = users.find((el) => el.id === data.id);
    if (user) {
      dispatch(changeAmount(data));
      reset();
    } else {
      alert('ID not found');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <SpanTitle>ID: </SpanTitle>
          <Input type="text" placeholder="User id" {...register('id')} />
          {errors.id && <SpanErrorInput>{errors.id.message}</SpanErrorInput>}
        </label>
        <label>
          <SpanTitle>New amount: </SpanTitle>
          <Input
            type="number"
            placeholder="Count AGC"
            {...register('newAmount', {
              required: 'Enter the amount to top up your balance.',
            })}
          />
          {errors.newAmount && <SpanErrorInput>{errors.newAmount.message}</SpanErrorInput>}
        </label>
        <InputBtn type="submit" value="Send">
          Send
        </InputBtn>
      </Form>
    </div>
  );
};
