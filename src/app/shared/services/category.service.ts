import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppCategory } from '../models/app-category';
// import { map } from 'rxjs/operators';
// import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getAll(): Observable<AppCategory[]> {
    // Approach #1 - Working
    return this.db.collection('categories', ref => ref.orderBy('description')).valueChanges() as Observable<AppCategory[]>;
    // Approach #2 - Working
    // return this.db.collection('/categories').snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => a.payload.doc.data() );
    //   })
    // );
    // Approach #3 - Working
    // return this.db.collection('/categories').snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(a => {
    //       const data = a.payload.doc.data();
    //       console.log(data);
    //       return data;
    //     });
    //   })
    // );
  }
}
