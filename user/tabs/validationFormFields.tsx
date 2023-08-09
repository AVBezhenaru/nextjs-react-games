/* eslint-disable arrow-body-style */
import dayjs from 'dayjs';

export const requireValidation = {
  required: 'Required field',
};

export const usernameValidation = () => ({
  ...requireValidation,
  minLength: {
    value: 3,
    message: 'Your username needs to be at least 3 characters.',
  },
  maxLength: {
    value: 20,
    message: 'Your username must contain no more than 20 characters.',
  },
});

export const emailValidation = () => ({
  ...requireValidation,
  pattern: {
    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Please enter a valid email address',
  },
});

export const phoneValidation = () => ({
  pattern: {
    value: /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
    message: 'Please enter a valid phone number',
  },
});

export const birthdateValidation = () => ({
  validate: (v: string) => {
    if (v === '') return true;
    const date = dayjs(v, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
    return (
      date.valueOf() < new Date().setUTCHours(0, 0, 0, 0) ||
      'the date of birth must be earlier than the current one'
    );
  },
});
