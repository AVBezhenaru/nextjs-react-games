/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import { useAppDispatch } from '../../../hooks';
import google from '../img/google.svg';
import facebook from '../img/facebook.svg';
import twitter from '../img/twitter.svg';
import { userSlice } from '../../../store/userSlice';
import { User } from '../../gamesItemTypes';

import {
  DivImgLogo,
  Form,
  H4,
  ImgLogo,
  Input,
  InputBtn,
  P,
  PError,
  Section,
  Span,
} from './loginFormStyle';

type Inputs = {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>();
  const [cookies, setCookies] = useCookies(['user']);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { updateList } = userSlice.actions;

  const onSubmit: SubmitHandler<Inputs> = (date: Inputs) => {
    const user: User = {
      image: '',
      username: date.username,
      email: date.email,
      password: date.password,
    };
    console.log('user :', user);
    clearErrors();
    dispatch(updateList([user]));
    cookies.user = user;
    router.push('/profile');
  };

  return (
    <Section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <DivImgLogo>
          <a href="https://www.google.com">
            <ImgLogo src={google.src} alt="google" />
          </a>
          <a href="https://www.facebook.com">
            <ImgLogo src={facebook.src} alt="facebook" />
          </a>
          <a href="https://www.twitter.com">
            <ImgLogo src={twitter.src} alt="twitter" />
          </a>
        </DivImgLogo>
        <H4>
          <Span>or with Email</Span>
        </H4>
        <Input
          placeholder="Username"
          {...register('username', {
            required: 'Required field',
            minLength: {
              value: 3,
              message: 'At least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 character',
            },
          })}
        />
        {errors?.username && <PError>{errors.username.message}</PError>}

        <Input
          placeholder="Some@example.com"
          {...register('email', {
            required: 'Required field',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Type valid email',
            },
          })}
        />
        {errors?.email && <PError>{errors.email.message}</PError>}

        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'You must specify a password',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password must have maximum 40 characters',
            },
          })}
        />
        {errors.password && <PError>{errors.password.message}</PError>}

        <InputBtn type="submit" children="Create" />
        <P>
          Already have an account?{' '}
          <Link href="/login">
            <a>Sign In.</a>
          </Link>
        </P>
      </Form>
    </Section>
  );
};

export default RegistrationForm;
