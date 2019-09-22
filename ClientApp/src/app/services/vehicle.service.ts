import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = "/api/vehicles";
  constructor(private http: Http) { }

  getMakes() {
    return this.http.get('/api/makes')
    .pipe(map(res => res.json()));
  }

  getFeatures() {
    return this.http.get('/api/features')
    .pipe(map(res => res.json()));
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle)
    .pipe(map(res => res.json()));
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
    .pipe(map(res => res.json()));
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
    .pipe(map(res => res.json()));
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
    .pipe(map(res => res.json()));    
  }

  getVehicles() {
    return this.http.get(this.vehiclesEndpoint)
    .pipe(map(res => res.json()));
  }

  toQueryString(obj) {
    var parts = [];
    for (var prop in obj) {
      var value = obj[prop];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(prop) + "=" + encodeURIComponent(value));
    }
    return parts.join("&");
  }
}