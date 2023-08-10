import { Box, Grid, Divider, Typography, Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { FC } from 'react';

type InfoProps = {
  setEditInfo: (arg0: boolean) => void;
};

const Info: FC<InfoProps> = ({ setEditInfo }) => {
  const currentUser = useCookies(['user'])[0].user;
  if (!currentUser) return;

  const data = {
    username: currentUser.username,
    email: currentUser.email,
    address: currentUser.address,
    phone: currentUser.phone,
    birthdate: currentUser.birthdate.split('T')[0].split('-').reverse().join('.'),
    gender: currentUser.gender,
  };

  return (
    <Box sx={{ p: '0 20px' }}>
      <Grid container direction="column" rowSpacing={3}>
        {Object.entries(data).map(([field, value]) => (
          <Box sx={{ pt: 3 }} key={field}>
            <Grid item container>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: '700' }}>{field}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{value}</Typography>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
      </Grid>

      <Box textAlign="end" mt={2}>
        <Button variant="outlined" onClick={() => setEditInfo(true)}>
          edit
        </Button>
      </Box>
    </Box>
  );
};
export default Info;
