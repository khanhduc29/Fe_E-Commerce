
export type OrderItemType = {
    id: string;
    status: string;
    products: CartItemInOrderType[];
    total: number;
    coupon: string;
    orderBy?: string;
    createdAt?: string;
}

export type CartItemInOrderType = {
    id: string;
    count: number;
    color: string;
    product: ProductItemInOrderType
}

export type ProductItemInOrderType = {
    id: string;
    title: string;
    price: number;
    thumb: string;
}