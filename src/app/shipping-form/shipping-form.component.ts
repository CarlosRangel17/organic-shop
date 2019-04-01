import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { AppOrder } from '../models/app-order';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AppShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: AppShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new AppOrder(this.userId,  this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }
}
