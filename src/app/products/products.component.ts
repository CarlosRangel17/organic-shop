import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {

    productService
      .getAll()
      .switchMap(products => {
        this.products = <AppProduct[]><unknown>products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category)
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe((cart: AppShoppingCart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
