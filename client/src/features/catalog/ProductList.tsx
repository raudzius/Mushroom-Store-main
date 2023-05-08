import { Grid } from '@mui/material';
import React from 'react';
import { Product } from '../../app/models/product';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} item xs={4}>
          {!productsLoaded ? <ProductCardSkeleton /> : <ProductCard product={product} />}
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
