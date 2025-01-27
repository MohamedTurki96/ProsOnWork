import { Pipe, PipeTransform } from '@angular/core';
import { GeoLocation } from '../models/model';

@Pipe({
  name: 'geolocation',
})
export class GeoLocationPipe implements PipeTransform {
  transform(geoLocation: GeoLocation | null): string | null{
    if (!geoLocation) {
      return "";
    }

    const { latitude, longitude } = geoLocation;
    return `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(
      6
    )}`;
  }
}
