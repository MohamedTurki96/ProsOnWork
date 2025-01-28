import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category, GeoLocation, Service } from 'src/app/shared/models/model';
import { GeoLocationService } from 'src/app/shared/geo-location/geo-location.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit {
  public routes = routes;
  public listView: boolean = false;
  public services: Service[] = [];
  public categories: Category[] = [];
  public geoLocation: GeoLocation | null = null;
  public isCollapsed = false;

  constructor(
    private categoriesService: CategoriesService,
    private geoLocationService: GeoLocationService,
    public data: DataService
  ) {
    this.services = this.data.serviceList;
  }

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe(
      (data) => (this.categories = data)
    );
    this.categoriesService.getCategories();

    this.geoLocationService.selectedLocation$.subscribe(
      (data) => (this.geoLocation = data)
    );
  }

  setListView(listView: boolean) {
    this.listView = listView;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  toggleCollapse() {
    if (this.isCollapsed == true) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }
  
}
