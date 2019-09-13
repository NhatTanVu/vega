import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

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
    return this.http.post('/api/vehicles', vehicle)
    .pipe(map(res => res.json()));
  }

  getVehicle(id) {
    return this.http.get('/api/vehicles/' + id)
    .pipe(map(res => res.json()));
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
    .pipe(map(res => res.json()));
  }

  delete(id) {
    return this.http.delete('/api/vehicles/' + id)
    .pipe(map(res => res.json()));    
  }
}
