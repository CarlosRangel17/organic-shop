import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {
  categories$; // : Observable<any[]>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$);
   }

  ngOnInit() {
  }

}
