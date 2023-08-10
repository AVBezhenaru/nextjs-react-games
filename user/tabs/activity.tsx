import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCookies } from 'react-cookie';
import { v1 } from 'uuid';

interface LogObj {
  time: string;
  pathname: string;
  query: object;
}

interface Storage {
  [key: string]: LogObj[];
}

const Activity = () => {
  const currentUser = useCookies(['user'])[0].user;
  const storage: Storage = JSON.parse(localStorage.getItem(`${currentUser?.username}-activity`));

  return (
    <div>
      {Object.entries(storage)
        .reverse()
        .map(([day, logData], i) => (
          <Accordion key={day}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={String(i)}
              id={String(i)}
            >
              <Typography sx={{ color: 'primary.main' }}>{day}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={4} sx={{ p: '10px 0', fontWeight: 'bold' }}>
                  time
                </Grid>
                <Grid item xs={8} sx={{ p: '10px 0', fontWeight: 'bold' }}>
                  page
                </Grid>
              </Grid>
              {logData.map(({ time, pathname }) => (
                <Grid container key={v1()}>
                  <Grid item xs={4}>{`${time}`}</Grid>
                  <Grid item xs={8}>{`${pathname}`}</Grid>
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default Activity;
