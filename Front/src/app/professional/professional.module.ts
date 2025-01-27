import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalComponent } from './professional.component';
import { ProfessionalRoutingModule } from './professional-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfessionalComponent],
  imports: [CommonModule, ProfessionalRoutingModule, SharedModule],
})
export class ProfessionalModule {}
