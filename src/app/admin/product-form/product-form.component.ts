import { Component } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Observable } from 'rxjs';
import { AppCategory } from '../../shared/models/app-category';
import { ProductService } from '../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AppProduct } from '../../shared/models/app-product';

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
      this.categories$ = this.categoryService.getAll();
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.productService.get(this.id)
          .pipe(take(1))
          .subscribe(p => this.product = p);
      } else {
        this.product = {
          key: '',
          title: '',
          price: 0,
          category: '',
          imageUrl: ''
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

  delete() {
    if(!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
