import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  cart: AppShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  placeOrder() {
    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping
    };
    console.log(this.shipping);
  }

  async ngOnInit() { 
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
  }
}
