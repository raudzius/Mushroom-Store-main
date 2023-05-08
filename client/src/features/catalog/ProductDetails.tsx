import { LoadingButton } from '@mui/lab';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import { addBasketItemAsync, removeBasketItemAsync } from '../basket/basketSlice';
import { fetchProductAsync, productSelectors } from './catalogSlice';

const ProductDetails: React.FC = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const product = useAppSelector((state) => productSelectors.selectById(state, id!));
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const basketItem = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (basketItem) setQuantity(basketItem.quantity);
    if (!product) dispatch(fetchProductAsync(Number(id)));
  }, [id, basketItem, dispatch, product]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) setQuantity(Number(event.target.value));
  };

  const handleUpdateCart = (event: any) => {
    if (!basketItem || quantity > basketItem.quantity) {
      const updatedQuantity = basketItem ? quantity - basketItem?.quantity : quantity;
      dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
    } else {
      const updatedQuantity = basketItem.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
    }
  };

  if (productStatus.includes('pending')) {
    return <LoadingComponent loadingMessage='Loading product...' />;
  }

  if (!product) {
    return (
      <Typography variant='h6' component='h3'>
        Product not found
      </Typography>
    );
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Image src={product.pictureUrl} alt={product.name} width='100%' duration={0}></Image>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={basketItem?.quantity === quantity || (!basketItem && quantity === 0)}
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              loading={status.includes('pending')}
              onClick={handleUpdateCart}
            >
              {basketItem ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
