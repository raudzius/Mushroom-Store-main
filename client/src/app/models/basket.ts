export type BasketItem = {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  type: string;
  category: string;
  quantity: number;
};

export type Basket = {
  id: number;
  buyerId: string;
  items: BasketItem[];
};