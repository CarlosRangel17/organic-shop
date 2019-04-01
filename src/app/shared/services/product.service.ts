import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppProduct } from '../models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    this.db.collection('products').add(product);
  }

  getAll() {
    return this.db.collection('products').snapshotChanges().pipe(
        map(actions => actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
      ));
  }

  get(productId: string): Observable<AppProduct> {
    return this.db.collection('products').doc(productId).valueChanges() as Observable<AppProduct>;
  }

  update(productId: string, product: AppProduct) {
    return this.db.collection('products').doc(productId).update(product);
  }

  delete(productId: string) {
    return this.db.collection('products').doc(productId).delete();
  }
}
