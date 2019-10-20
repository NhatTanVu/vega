import { SaveVehicle, Vehicle, KeyValuePair } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = "/api/vehicles";
  constructor(private http: HttpClient, private auth: AuthService) { }

  getMakes() {
    return this.http.get('/api/makes')
    .pipe(map(res => <KeyValuePair[]>res));
  }

  getFeatures() {
    return this.http.get('/api/features')
    .pipe(map(res => <Object[]>res));
  }

  create(vehicle) {
    return this.auth.getToken().pipe(switchMap(token => 
      this.http.post(this.vehiclesEndpoint, vehicle, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })}).pipe(map(res => <Vehicle>res))
    ));
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
    .pipe(map(res => <Vehicle>res));
  }

  update(vehicle: SaveVehicle) {
    return this.auth.getToken().pipe(switchMap(token => 
      this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })}).pipe(map(res => <Vehicle>res))
    ),);
  }

  delete(id) {
    return this.auth.getToken().pipe(switchMap(token => 
      this.http.delete(this.vehiclesEndpoint + '/' + id, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })}).pipe(res => res)
    ));
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
    .pipe(res => res);
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