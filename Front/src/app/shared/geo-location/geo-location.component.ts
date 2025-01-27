import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocationService } from './geo-location.service';
import { GeoLocation } from '../models/model';
import { first } from 'rxjs';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrl: './geo-location.component.css',
})
export class GeoLocationComponent implements AfterViewInit {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  @Input() parentControl: boolean = false;

  constructor(private geoLocationService: GeoLocationService) {}

  ngAfterViewInit(): void {
    if (!this.parentControl) {
      this.initMap();
    }
  }

  initMap(): void {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

    tiles.addTo(this.map);

    this.map.addEventListener('click', (e) => this.onClick(e));

    this.geoLocationService.selectedLocation$.subscribe(value => {
      if (value) {
        this.setMarker(value)
      }
    });
  }

  onClick(event: L.LeafletMouseEvent) {
    const location = {
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    };
    this.geoLocationService.setGeoLocation(location)
  }

  setMarker(geoLocation: GeoLocation) {
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = new L.Marker({
      lat: geoLocation.latitude,
      lng: geoLocation.longitude,
    });

    this.map?.addLayer(this.marker);
  }

  resizeMap() {
    this.map?.invalidateSize();
  }

  handleCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geoLocationService.setGeoLocation(position.coords);
      this.setMarker(position.coords);
    });
  }
}
