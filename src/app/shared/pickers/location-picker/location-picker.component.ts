import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { PlaceService } from './../../../home/place.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController,private http: HttpClient,private placeSvc: PlaceService) { }

  ngOnInit() {}
  async onPickLocation(){
    const modal = await this.modalCtrl.create({
      component: MapModalComponent
    });
    modal.onDidDismiss().then((modalData) => {
      console.log(modalData.data);
      this.getAddress(modalData.data.lat,modalData.data.lng).subscribe(
        (address) => {
          this.placeSvc.setAddress(address);
          console.log(address);
        }
      );
    });
    return await modal.present();
  }
  private getAddress(Lat: number,Lng : number){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${Lat},${Lng}&key=${environment.mapsAPIKey}`)
    .pipe(
      map(geoData => {
        if(!geoData || !geoData.results || !geoData.results.length){
          return null;
        }
        return geoData.results[0].formatted_address;
      })
    );
  }
}
