import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    var data = JSON.parse(JSON.stringify(order));
    let result = await this.db.collection('orders').add(data);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.collection('orders').snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
    ));
  }

  getOrdersByUser(userId: string) {
    return this.db.collection('orders',  ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
    ));
  }
}
