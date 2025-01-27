import { NgModule } from '@angular/core';
import { GeoLocationComponent } from './geo-location.component';
import { GeoLocationService } from './geo-location.service';
import { GeoLocationPipe } from './geo-location.pipe';

@NgModule({
  declarations: [GeoLocationComponent, GeoLocationPipe],
  providers: [GeoLocationService],
  exports: [GeoLocationComponent, GeoLocationPipe],
})
export class GeoLocationModule {}
