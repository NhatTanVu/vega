import { FeatureService } from './../../services/feature.service';
import { MakeService } from './../../services/make.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  vehicle: any;
  models: any[];
  features: any[];

  constructor(
    private makeService: MakeService,
    private featureService: FeatureService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(makes => {
      this.makes = makes;
    });
    this.vehicle = {};
    this.featureService.getFeatures().subscribe(features => {
      this.features = features;
    })
  }

  onMakeChange() {
    console.log("VEHICLE", this.vehicle);
    var selectedmake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedmake ? selectedmake.models : [];
  }
}
