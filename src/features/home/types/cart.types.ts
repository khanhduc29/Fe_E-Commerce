import { ProductItemType } from "./product.types";

export type CartItem = {
  quantity: number;
  color: string;
  product: ProductItemType;
  id: string;
}

export type ProductInCart = {
  quantity: number;
  color: string;
  title: string;
  price: number;
  image: string;
}

