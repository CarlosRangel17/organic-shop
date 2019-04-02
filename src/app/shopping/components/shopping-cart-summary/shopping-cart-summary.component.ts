import { Component, Input } from '@angular/core';
import { AppShoppingCart } from '../../../shared/models/app-shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.sass']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: AppShoppingCart;
}
