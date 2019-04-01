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
      const filteredItems = items.filter(item => item.quantity > 0);
      this.cart = new AppShoppingCart(filteredItems);
    });
   }

   clearCart() {
     this.shoppingCartService.clearCart();
   }
}
