import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      console.log(cart);
      console.log(cart.items);
      // tslint:disable-next-line:forin
      for (const productId in cart.items) {
        console.log(productId);
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
    // cart$.switchMap(cart => {
    //   console.log(cart);
    //   this.shoppingCartItemCount = 0;
    //   return cart.items;
    // }).subscribe(item => {
    //   this.shoppingCartItemCount += item.quantity;
    // });
  }

  logout() {
    this.auth.logout();
  }

}
