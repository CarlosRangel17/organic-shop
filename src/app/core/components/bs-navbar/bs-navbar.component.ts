import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppShoppingCart } from '../../../shared/models/app-shopping-cart';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart: AppShoppingCart;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    const items$ = await this.shoppingCartService.getItems();
    items$.subscribe((items: any) => {
      this.cart = new AppShoppingCart(items);
    });
  }

  logout() {
    this.auth.logout();
  }

}
