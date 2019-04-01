import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppProduct } from './models/app-product';
import { Observable } from 'rxjs';
import { AppShoppingCartItem } from './models/app-shopping-cart-item';
import { AppShoppingCart } from './models/app-shopping-cart';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.collection('shopping-carts').doc(cartId)
      .valueChanges()
      .pipe(
        map((cart: AppShoppingCart) => {
          // Figure out how to utilize getItems() instead
          this.getCartItems(cartId).subscribe(items => {
            cart.items = items; // {...items}
          });
          return cart;
        })
      );
  }

  async getItems() {
    const cartId = await this.getOrCreateCartId();
    return this.db.collection('shopping-carts').doc(cartId).collection('items').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
      )) as Observable<AppShoppingCartItem[]>;
  }

  async addToCart(product: AppProduct) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: AppProduct) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    const path = 'shopping-carts/' + cartId + '/items';
    const query: firebase.firestore.QuerySnapshot = await this.db.collection(path).ref.get();
    const batch = this.db.firestore.batch();

    // looping through docs in the collection to delete docs as a bulk operation
    query.forEach(doc => {
      console.log('deleting:', doc.id);
      batch.delete(doc.ref);
    });

    // finally commit
    batch.commit().then(res => console.log('committed batch.'))
      .catch(err => console.error('error committing batch.', err));
  }

  private create() {
    return this.db.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItems(cartId: string) {
    return this.db.collection('shopping-carts').doc(cartId).collection('items')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
        )) as Observable<AppShoppingCartItem[]>;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.collection('shopping-carts').doc(cartId).collection('items').doc(productId)
      .valueChanges() as Observable<AppShoppingCartItem>;
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create(); // this.create().then(result => {});
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async updateItem(product: AppProduct, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.take(1).subscribe(item => {
      const quantity = (item && item.quantity || 0) + change;
      if (quantity === 0) {
        this.db.collection('shopping-carts').doc(cartId).collection('items').doc(product.key).delete();
      } else {
        this.db.collection('shopping-carts').doc(cartId).collection('items').doc(product.key)
          .set({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
      }
    });
  }
}
