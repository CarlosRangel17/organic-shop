import { AppShoppingCartItem } from './app-shopping-cart-item';
import { AppProduct } from './app-product';

export class AppShoppingCart {
    key: string;
    items: AppShoppingCartItem[] = [];
    constructor(private itemsMap: { [productId: string]: AppShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
        for (const productId in itemsMap) {
            if (itemsMap.hasOwnProperty(productId)) {
                const item = itemsMap[productId];
                this.items.push(new AppShoppingCartItem({ ...item }));
            }
        }
    }

    getQuantity(product: AppProduct) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}
