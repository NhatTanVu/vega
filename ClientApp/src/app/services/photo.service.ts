import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append('file', photo);
    return this.auth.getToken().pipe(switchMap(token => 
      this.http.post(`/api/vehicles/${vehicleId}/photos`, formData,
      {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })        
      }).pipe(res => res)
    ));
  }

  getPhotos(vehicleId) {
    return this.http.get(`/api/vehicles/${vehicleId}/photos`, {
      withCredentials: false
    }).pipe(map(res => <Object[]>res));
  }
}
