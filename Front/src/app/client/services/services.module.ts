import { NgModule } from '@angular/core';
import { ServicesComponent } from './services.component';
import { CommonModule } from '@angular/common';
import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { ServicesListComponent } from './list/services-list.component';
import { ServicesGridComponent } from './grid/services-grid.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesGridComponent,
  ],
  imports: [CommonModule, ServicesRoutingModule, SharedModule, MatSliderModule],
})
export class ServicesModule {}
