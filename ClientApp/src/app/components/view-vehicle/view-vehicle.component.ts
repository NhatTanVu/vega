import { AuthService } from './../../services/auth.service';
import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  vehicle: any;
  vehicleId: number; 
  photos: any[];
  progress: any;

  constructor(
    private auth: AuthService,
    private zone: NgZone,    
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService
  ) { 
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });    
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });   

    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }  

  uploadPhoto() {
    this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });
      },
      null,
      () => {
        this.progress = null;
      });

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = "";
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      error => {
        this.handleError(error);
      });
  }

  private handleError(error) {
    if (error.error == "login_required") {
      this.toasty.error({
        title: 'Error',
        msg: 'Login required.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    }
    else {
      this.toasty.error({
        title: 'Error',
        msg: error.text(),
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    }
  }  
}
