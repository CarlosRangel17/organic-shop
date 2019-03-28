import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppProduct } from './models/app-product';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { AppShoppingCartItem } from './models/app-shopping-cart-item';
import { AppShoppingCart } from './models/app-shopping-cart';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  private create() {
    return this.db.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.collection('shopping-carts').doc(cartId)
      .valueChanges()
      .pipe(
        map((cart: AppShoppingCart) => {
          this.getCartItems(cartId).subscribe(items => {
            cart.items = items;
          });
          return cart;
        })
      );
  }

  private getCartItems(cartId: string) {
    return this.db.collection('shopping-carts').doc(cartId).collection('items')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
        )) as Observable<AppShoppingCartItem[]>;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.collection('shopping-carts').doc(cartId).collection('items').doc(productId).valueChanges() as Observable<AppShoppingCartItem>;
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create(); // this.create().then(result => {});
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addToCart(product: AppProduct) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: AppProduct) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: AppProduct, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.take(1).subscribe(item => {
      this.db.collection('shopping-carts').doc(cartId).collection('items').doc(product.key)
        .set({
          quantity: (item && item.quantity || 0) + change,
          product: product
        });
    });
  }
}
