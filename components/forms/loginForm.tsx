import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';

import { fetchLoginUser } from '../../api/service';
import { useAppDispatch } from '../../hooks';

import styles from './form.module.scss';

export type Inputs = {
  email: string;
  username: string;
  password: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (date) => {
    const user = {
      email: date.email,
      password: date.password,
    };
    console.log('user :', user);

    clearErrors();
    dispatch(fetchLoginUser());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Image src="/logo.png" width={120} height={120} />
        Gaming Login Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="User Name  or  email..."
          className={styles.input}
          {...register('username', {
            required: 'Required field',
          })}
        />
        {errors?.username && <p className={styles.error}>{errors.username.message}</p>}

        <input
          placeholder="Password"
          className={styles.input}
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
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <input type="submit" className={styles.button} value="Submit" />
        <p className={styles.text}>
          Don`t have an account?{' '}
          <Link href="/registration">
            <a className={styles.link}>Sign Up</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
