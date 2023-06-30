import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, pickersLayoutClasses } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { makeStyles } from '@mui/material';
import dayjs from 'dayjs';
import { makeStyles } from '@mui/styles';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setEventStartDate, setEventEndDate } from '../../store/slices/changeEventDetailsSlice';

export const DateTimePickers = () => {
  const dispatch = useAppDispatch();

  const { eventStartDate, eventEndDate } = useAppSelector(
    (state) => state.calendar.changeEventDetailsReducer,
  );

  const useStyles = makeStyles({
    root: {
      '& .MuiInputBase-root': {
        color: 'white',
        width: '100%',
        backgroundColor: '#383f51',
      },

      '& .MuiSvgIcon-root': {
        color: '#d65b88',
      },

      '.MuiPickersSlideTransition-root': {
        color: 'white',
      },
      '.MuiPickersFadeTransitionGroup-root': {
        color: 'white',
      },
      '& label': {
        fontWeight: '600',
        color: '#d65b88',
      },
      '& label.Mui-focused': {
        color: 'rgb(220, 53, 69)',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey',
        },
        '&:hover fieldset': {
          borderColor: 'grey',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#d65b88',
        },
      },
    },
  });

  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={eventStartDate}
        onChange={(newValue) => dispatch(setEventStartDate(newValue))}
        label="Event start"
        className={classes.root}
        slotProps={{
          layout: {
            sx: {
              [`.${pickersLayoutClasses.actionBar}`]: {
                backgroundColor: '#383F51',
              },
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                backgroundColor: '#383F51',
                color: 'white',
              },
              '.MuiList-root': {
                width: '50px',
              },
              '.MuiMenuItem-root': {
                display: 'block',
                paddingLeft: '5px',
              },
              '.MuiButtonBase-root': {
                color: 'white',
              },
              '.MuiButtonBase-root:hover': {
                backgroundColor: '#d65b88',
              },
              '.MuiButtonBase-root.Mui-disabled': {
                color: 'grey',
                opacity: '0.9',
              },
              '.MuiButtonBase-root.Mui-selected': {
                backgroundColor: 'rgb(220, 53, 69)',
              },
              '.MuiButtonBase-root.Mui-selected:hover': {
                backgroundColor: 'rgb(220, 53, 69)',
              },
              '.MuiTypography-root': {
                color: 'white',
              },
            },
          },
        }}
        minDate={dayjs(new Date())}
      />
      <DateTimePicker
        value={eventEndDate}
        onChange={(newValue) => dispatch(setEventEndDate(newValue))}
        label="Event end"
        className={classes.root}
        slotProps={{
          layout: {
            sx: {
              [`.${pickersLayoutClasses.actionBar}`]: {
                backgroundColor: '#383F51',
              },
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                backgroundColor: '#383F51',
                color: 'white',
              },
              '.MuiList-root': {
                width: '50px',
              },
              '.MuiMenuItem-root': {
                display: 'block',
                paddingLeft: '5px',
              },
              '.MuiButtonBase-root': {
                color: 'white',
              },
              '.MuiButtonBase-root:hover': {
                backgroundColor: '#d65b88',
              },
              '.MuiButtonBase-root.Mui-disabled': {
                color: 'grey',
                opacity: '0.9',
              },
              '.MuiButtonBase-root.Mui-selected': {
                backgroundColor: 'rgb(220, 53, 69)',
              },
              '.MuiButtonBase-root.Mui-selected:hover': {
                backgroundColor: 'rgb(220, 53, 69)',
              },
              '.MuiTypography-root': {
                color: 'white',
              },
            },
          },
        }}
        minDate={dayjs(new Date())}
      />
    </LocalizationProvider>
  );
};
