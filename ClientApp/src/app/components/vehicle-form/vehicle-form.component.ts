import { ToastyService } from 'ng2-toasty';
import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };
  models: any[];
  features: any[];

  constructor(
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) { 
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'] || 0;
      });
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.vehicleService.getVehicle(this.vehicle.id).subscribe(vehicle => {
          this.setVehicle(vehicle);
          this.populateModels();
        });
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(["/"]);
      }
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedmake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedmake ? selectedmake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if($event.target.checked) {
      this.vehicle.features.push(featureId);
    }
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    result$.subscribe(
      vehicle => {
        this.toasty.success({
          title: "Success",
          msg: "Data was successfully saved.",
          theme: "bootstrap",
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['/vehicles/', vehicle.id]);
      },
      err => {
        this.handleUnauthorizedError(err);
      }
    );
  }

  delete() {
    if(confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(
        x => {
          this.router.navigate(["/"]);
        },
        err => {
          this.handleUnauthorizedError(err);
        }
      );
    }
  }

  private handleUnauthorizedError(err) {
    if (err.error == "login_required") {
      this.toasty.error({
        title: 'Error',
        msg: 'Login required.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
    }
    else {
      throw err;
    }
  }
}
