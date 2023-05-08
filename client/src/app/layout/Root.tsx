import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, Container } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { useAppDispatch } from '../store/configureStore';
import Header from './Header';
import LoadingComponent from './LoadingComponent';

const Root: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: { default: paletteType === 'light' ? '#eaeaea' : '#121212' },
    },
  });

  if (loading) return <LoadingComponent loadingMessage='Initializing app...' />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default Root;
