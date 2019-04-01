import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  cart: AppShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    const items$ = await this.shoppingCartService.getItems();
    items$.subscribe((items: any) => {
      this.cart = new AppShoppingCart(items);
    });
   }

   clearCart() {
     this.shoppingCartService.clearCart();
   }
}
