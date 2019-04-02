import { Component, OnInit, Input } from '@angular/core';
// import { CategoryService } from 'src/app/category.service';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.sass']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
