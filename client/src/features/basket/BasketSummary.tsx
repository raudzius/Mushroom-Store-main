import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';

const BasketSummary: React.FC = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const subtotal = basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subtotal >= 10000 ? 0 : 500;

  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align='right'>{currencyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>{currencyFormat(subtotal + deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography component='span' style={{ fontStyle: 'italic' }}>
                  *Orders over $100 qualify for free delivery
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BasketSummary;
