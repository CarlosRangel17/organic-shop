import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {
  @Input('product') product: AppProduct;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: AppShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart || !this.shoppingCart.items) { return 0; }

    const item = this.shoppingCart.items.find(x => x.key === this.product.key);
    return item ? item.quantity : 0;
  }
}
