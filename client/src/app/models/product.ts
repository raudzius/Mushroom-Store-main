export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  category: string;
  quantityInStock: number;
};

export type ProductParams = {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  categories: string[];
  pageNumber: number;
  pageSize: number;
};