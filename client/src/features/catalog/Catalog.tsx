import { Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import AppPagination from '../../app/components/AppPagination';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from './catalogSlice';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

const Catalog: React.FC = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, types, categories, productParams, metaData } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
  ];

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded) return <LoadingComponent loadingMessage='Loading products...' />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={categories}
            checked={productParams.categories}
            onChange={(items: string[]) => dispatch(setProductParams({ categories: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Catalog;
