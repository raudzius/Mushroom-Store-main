import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>{product.name.charAt(0).toUpperCase()}</Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant='h5'>
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.type} / {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size='small'
          loading={status.includes('pendingAddItem' + product.id)}
          onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
        >
          Add to cart
        </LoadingButton>
        <Button component={RouterLink} to={`/catalog/${product.id}`} size='small'>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
