import { AppShoppingCart } from './app-shopping-cart';

export class AppOrder {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: AppShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.quantity * i.price
            }
          });
    }
}