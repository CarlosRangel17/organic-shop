import { Component } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { AppCategory } from 'src/app/models/app-category';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AppProduct } from 'src/app/models/app-product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent {
  categories$: Observable<AppCategory[]>;
  product: AppProduct;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
      // Initialize variables
      this.categories$ = this.categoryService.getCategories();
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.get(this.id)
          .pipe(take(1))
          .subscribe(p => this.product = p);
      } else {
        this.product = {
          title: '',
          price: ''
        };
      }
  }

  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }
}
