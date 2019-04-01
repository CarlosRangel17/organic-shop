import { AppProduct } from './app-product';

export class AppShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    // init is meant as a basic variable & captures partial properties
    constructor(init?: Partial<AppShoppingCartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
