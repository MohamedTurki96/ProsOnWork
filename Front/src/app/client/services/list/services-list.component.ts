import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { serviceList } from 'src/app/shared/models/pages-model';
import { Service } from 'src/app/shared/models/model';

interface data {
  value: string;
}

@Component({
  selector: 'services-list',
  templateUrl: './services-list.component.html',
})
export class ServicesListComponent {
  public routes = routes;
  public isClassAdded: boolean[] = [false];
  @Input() services: Service[] = []

  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
}
