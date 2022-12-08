/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import facebook from '../img/facebook.svg';
import google from '../img/google.svg';
import twitter from '../img/twitter.svg';
import { useAppSelector } from '../../../hooks';

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

export type Inputs = {
  email: string;
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>();
  const { users } = useAppSelector((state) => state.user);
  const [cookies, setCookies] = useCookies(['user']);

  const onSubmit: SubmitHandler<Inputs> = (date) => {
    const user = {
      email: date.username,
      username: date.username,
      password: date.password,
    };
    // console.log('user :', user);

    clearErrors();
    const authUser = users.find(
      (u: any) =>
        (u.email === user.email || u.username === user.username) && u.password === user.password,
    );
    if (authUser) {
      setCookies('user', authUser);
      // console.log('auth');
      router.push('/profile');
    }
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
          placeholder="User Name  or  email..."
          {...register('username', {
            required: 'Required field',
          })}
        />
        {errors?.username && <PError>{errors.username.message}</PError>}

        <Input
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

        <InputBtn type="submit" children="Register" />
        <P>
          Don`t have an account?
          <Link href="/registration">
            <a style={{ color: '#F46119' }}>Sign Up</a>
          </Link>
        </P>
      </Form>
    </Section>
  );
};

export default LoginForm;
