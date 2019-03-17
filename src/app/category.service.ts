import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppCategory } from './models/app-category';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getCategories() {
    // return this.db.collection('categories').valueChanges() as Observable<any[]>;
    return this.db.collection('/categories').snapshotChanges().pipe(
      // map(a => { ({ key: a.key, ...a.payload.val() }}) })
      map(actions => {
        return actions.map(a => {
          console.log(a.payload.doc.data());
          return a.payload.doc.data();
        // }).map(category => {
        //   console.log(category);
        //   return { key: category, value: category[0] };
        });
      })
    );

    // return this.db.collection('/categories').snapshotChanges().pipe(
    //   map(changes => {
    //     return changes.map(a => {
    //       const data = a.payload.doc.data();
    //       console.log(data);
    //       return data;
    //     });
    //   })
    // );

    // this.feedCollection = this.afs.collection('col-challange');
    // this.feedItem = this.feedCollection.snapshotChanges().map(changes => {
    //       return changes.map(a => {
    //         //here you get the data without first name
    //         const data = a.payload.doc.data() as Feed;
    //         //get the signup_id for getting doc from coll-signup
    //         const signupId = data.signup_id;
    //         //get the related document
    //         return afs.collection('coll-signup').doc(signupId).snapshotChanges().take(1).map(actions => {
    //           return actions.payload.data();
    //         }).map(signup => {
    //           //export the data in feeds interface format
    //           return { firstName: signup.firstName, ...data };
    //         });
    //       })
    //     }).flatMap(feeds => Observable.combineLatest(feeds));
  }
}
