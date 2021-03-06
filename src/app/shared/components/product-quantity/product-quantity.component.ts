import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../../models/app-product';
import { AppShoppingCart } from '../../models/app-shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})
export class ProductQuantityComponent {
  @Input('product') product: AppProduct;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: AppShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity(product: AppProduct) {
    if (!this.shoppingCart || !this.shoppingCart.items) { return 0; }

    const item = this.shoppingCart.items.find(x => x.key === this.product.key);
    return item ? item.quantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
