import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink as RouterNavLink, Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
};

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={RouterNavLink} to='/' sx={navStyles}>
            Shrooms
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton component={RouterNavLink} to={path} sx={navStyles}>
                <ListItemText primary={title.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box display='flex' alignItems='center'>
          <IconButton component={RouterLink} to='/basket' size='large' sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem key={path} disablePadding>
                  <ListItemButton component={RouterNavLink} to={path}>
                    <ListItemText primary={title.toUpperCase()} sx={navStyles} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
