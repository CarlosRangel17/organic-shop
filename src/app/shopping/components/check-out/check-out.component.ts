import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppShoppingCart } from '../../../shared/models/app-shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: AppShoppingCart;
  subscription: Subscription;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    const items$ = await this.shoppingCartService.getItems();
    this.subscription = items$.subscribe((items: any) => {
      this.cart = new AppShoppingCart(items);
    });
  }
}
