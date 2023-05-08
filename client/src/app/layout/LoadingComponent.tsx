import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

type LoadingComponentProps = {
  loadingMessage?: string;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({ loadingMessage = 'Loading...' }) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress size={100} color='secondary' />
        <Typography variant='h4' justifyContent='center' position='fixed' top='60%'>
          {loadingMessage}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingComponent;
