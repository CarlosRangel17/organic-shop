import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../../../shared/models/app-product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { AppShoppingCart } from '../../../shared/models/app-shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit { // , OnDestroy
  products: AppProduct[] = [];
  filteredProducts: AppProduct[] = [];
  category: string;
  cart$: Observable<AppShoppingCart>;
  // cart: any;
  // subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
    // this.subscription = (await this.shoppingCartService.getCart())
    //   .subscribe((cart: AppShoppingCart) => {
    //     this.cart = cart;
    //   });
  }

  private populateProducts() {
    this.productService
      .getAll()
      .switchMap(products => {
        this.products = <AppProduct[]><unknown>products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category)
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
