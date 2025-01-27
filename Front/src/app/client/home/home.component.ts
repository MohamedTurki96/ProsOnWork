import { Component, ElementRef, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { init } from 'ityped';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category, GeoLocation } from 'src/app/shared/models/model';
import { GeoLocationComponent } from 'src/app/shared/geo-location/geo-location.component';
import { GeoLocationService } from 'src/app/shared/geo-location/geo-location.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public routes = routes;
  public categories: Category[] = [];
  public selectedLocation: GeoLocation | null = null;
  @ViewChild('typedElement', { static: false }) typedElement!: ElementRef;
  @ViewChild(GeoLocationComponent) geoLocationComponent!: GeoLocationComponent;

  constructor(
    private categoriesService: CategoriesService,
    private geoLocationService: GeoLocationService,
    private router: Router
  ) {
    this.categoriesService.categories$.subscribe(
      (data) => (this.categories = data.slice(0, 12))
    );
  }

  ngAfterViewInit(): void {
    init(this.typedElement.nativeElement, {
      strings: [
        'Plombiers',
        'Électriciens',
        'Déménageurs',
        'Livreurs',
        'Nettoyeurs',
        'Menuisiers',
        'Coiffeurs',
        'Bâtisseurs',
      ],
      typeSpeed: 100, // Speed of typing
      backSpeed: 60, // Speed of backspacing
      loop: true, // Loop the typing effect
    });

    $('#geolocation_modal').on('shown.bs.modal', () => {
      this.geoLocationComponent.initMap();
      setTimeout(() => this.geoLocationComponent.resizeMap(), 500);
    });

    this.geoLocationService.selectedLocation$.subscribe((data) => {
      this.selectedLocation = data;
    });
  }

  handleSearch() {
    this.router.navigateByUrl(this.routes.services)
  }
}
