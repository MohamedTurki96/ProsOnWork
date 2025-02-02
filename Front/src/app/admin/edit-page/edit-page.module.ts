import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPageRoutingModule } from './edit-page-routing.module';
import { EditPageComponent } from './edit-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditPageComponent
  ],
  imports: [
    CommonModule,
    EditPageRoutingModule,
    SharedModule
  ]
})
export class EditPageModule { }
