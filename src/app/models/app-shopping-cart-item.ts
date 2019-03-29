import { AppProduct } from './app-product';

export interface AppShoppingCartItem {
    key: string;
    product: AppProduct;
    quantity: number;
}
