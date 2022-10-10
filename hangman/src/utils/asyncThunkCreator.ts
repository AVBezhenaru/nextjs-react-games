import { createAsyncThunk } from '@reduxjs/toolkit';

export const asyncThunkCreator = <R, D, F>({
  thunkName,
  callback,
}: {
  data?: D;
  thunkName: string;
  callback: F;
}) =>
  createAsyncThunk<R, D, { rejectValue: Error }>(thunkName, async (data, { rejectWithValue }) => {
    try {
      if (typeof callback === 'function') {
        const res = await callback(data);

        return await res.data;
      }
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error);
    }
  });
