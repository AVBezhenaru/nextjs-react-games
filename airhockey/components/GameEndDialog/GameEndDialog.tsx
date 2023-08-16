import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';

import { ButtonPlay } from '../Buttons/index';
import fail from '../../assets/images/fail.gif';
import won from '../../assets/images/won.gif';

type GameEndDialogProps = {
  left: number;
};

const CustomDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(to bottom right, #000, #3d232a)',
  },
}));

export const GameEndDialog: FC<GameEndDialogProps> = ({ left }) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClickReplay = () => {
    router.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ color: 'white', textAlign: 'center' }}>
        {left === 7 ? 'you won!!! 🤩' : 'you lost 😓'}
      </DialogTitle>
      <DialogContent>
        <Image src={left === 7 ? won : fail} alt="" width={600} />
      </DialogContent>
      <DialogActions>
        <ButtonPlay onClick={handleClickReplay}>Play again</ButtonPlay>
        <ButtonPlay onClick={handleClose}>Close</ButtonPlay>
      </DialogActions>
    </CustomDialog>
  );
};
