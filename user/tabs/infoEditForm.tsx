/* eslint-disable prefer-destructuring */
import React, { useEffect, FC, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { setNewUsernameInLocalStorage } from '../pageTracking/setLogInLocalStorage';
import { InfoEditFormProps, FormValues } from '../types/gamesItemTypes';

import {
  usernameValidation,
  emailValidation,
  phoneValidation,
  birthdateValidation,
} from './validationFormFields';

const InfoEditForm: FC<InfoEditFormProps> = ({ setEditInfo }) => {
  const [cookies, setCookies] = useCookies(['user']);
  const currentUser = cookies.user;
  const { username, email, address, phone, birthdate, gender } = currentUser;
  const initialValue = {
    username,
    email,
    address,
    phone,
    birthdate,
    gender,
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    control,
    setFocus,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  type Label = keyof FormValues;

  const inputsFields: [Label, ReactNode][] = [
    [
      'username',
      <TextField
        variant="standard"
        size="small"
        fullWidth
        {...register('username', usernameValidation())}
      />,
    ],
    [
      'email',
      <TextField
        variant="standard"
        size="small"
        fullWidth
        {...register('email', emailValidation())}
      />,
    ],
    ['address', <TextField variant="standard" size="small" fullWidth {...register('address')} />],
    [
      'phone',
      <TextField
        variant="standard"
        size="small"
        fullWidth
        {...register('phone', phoneValidation())}
      />,
    ],
    [
      'birthdate',
      <Controller
        control={control}
        rules={birthdateValidation()}
        name="birthdate"
        render={({ field: { value, onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DateField
              value={dayjs(value, 'YYYY-MM-DDTHH:mm:ssZ[Z]')}
              variant="standard"
              size="small"
              fullWidth
              onChange={(newValue) => {
                onChange(newValue);
              }}
            />
          </LocalizationProvider>
        )}
      />,
    ],
    [
      'gender',
      <Controller
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            aria-label="gender"
            onChange={(value) => {
              onChange(value);
            }}
            row
          >
            <FormControlLabel
              value="female"
              control={<Radio size="small" checked={value === 'female'} />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio size="small" checked={value === 'male'} />}
              label="Male"
            />
          </RadioGroup>
        )}
        name="gender"
        control={control}
      />,
    ],
  ];

  useEffect(() => {
    if (currentUser) {
      setValue('username', username);
      setValue('email', email);
      setValue('address', address);
      setValue('phone', phone);
      setValue('birthdate', birthdate);
      setValue('gender', gender);
    }
  }, [currentUser, setValue]);

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit = (data: FormValues) => {
    if (typeof data.birthdate === 'object') {
      data.birthdate = dayjs(data.birthdate).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
    }
    const newUserData = { ...currentUser, ...data };
    setCookies('user', newUserData);
    if (currentUser.username !== data.username) {
      setNewUsernameInLocalStorage(currentUser.username, data.username);
    }
    setEditInfo(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 2 }}>
          <Grid container direction="column" rowSpacing={3}>
            {inputsFields.map(([label, value]) => (
              <Box key={label} sx={{ pt: '20px' }}>
                <Grid item container>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: '700' }}>{label}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {value}
                    {errors?.[label] && (
                      <Typography color="error">{errors[label].message}</Typography>
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          </Grid>
        </Box>

        <Box textAlign="end" mt={2}>
          <Button type="submit" variant="outlined" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => reset(initialValue)}>
            Reset
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default InfoEditForm;
