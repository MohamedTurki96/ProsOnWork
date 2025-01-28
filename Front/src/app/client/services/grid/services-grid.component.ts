import { Component, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/model';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'services-grid',
  templateUrl: './services-grid.component.html',
})
export class ServicesGridComponent {
  public routes = routes;
  public isClassAdded: boolean[] = [false];

  @Input() services: Service[] = []

  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
}
