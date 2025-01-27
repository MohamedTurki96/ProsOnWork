import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/model';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  public routes = routes;
  public categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe(
      (data) => (this.categories = data)
    );
  }

  goToSearch() {
    this.router.navigateByUrl(this.routes.services);
  }
}
