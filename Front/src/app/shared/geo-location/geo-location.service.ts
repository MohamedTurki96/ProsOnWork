import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeoLocation } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private selectedLocationSubject =
    new BehaviorSubject<GeoLocation | null>(null);
  public selectedLocation$ = this.selectedLocationSubject.asObservable();

  setGeoLocation(geoLocation: GeoLocation) {
    this.selectedLocationSubject.next(geoLocation);
  }
}
