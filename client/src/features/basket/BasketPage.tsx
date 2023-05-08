import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
import BasketSummary from './BasketSummary';

const BasketPage: React.FC = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket)
    return (
      <Typography variant='h3' component='h1'>
        Your basket is empty.
      </Typography>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((basketItem) => (
              <TableRow
                key={basketItem.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Box display='flex' alignItems='center'>
                    <Image
                      src={basketItem.pictureUrl}
                      alt={basketItem.name}
                      duration={0}
                      height={50}
                      width={50}
                      style={{ marginRight: 70 }}
                    />
                    <Typography component='span'>{basketItem.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align='right'>{currencyFormat(basketItem.price)}</TableCell>
                <TableCell align='center'>
                  <LoadingButton
                    color='success'
                    loading={status === 'pendingAddItem' + basketItem.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: basketItem.productId,
                        })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                  {basketItem.quantity}
                  <LoadingButton
                    color='error'
                    loading={status === 'pendingRemoveItem' + basketItem.productId + 'rem'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: basketItem.productId,
                          quantity: 1,
                          name: 'rem',
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(basketItem.price * basketItem.quantity)}
                </TableCell>
                <TableCell align='right'>
                  <LoadingButton
                    color='error'
                    loading={status === 'pendingRemoveItem' + basketItem.productId + 'del'}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: basketItem.productId,
                          quantity: basketItem.quantity,
                          name: 'del',
                        })
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={RouterLink} to='/checkout' variant='contained' size='large' fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
