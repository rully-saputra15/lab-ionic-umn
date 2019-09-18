import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { PlacesService } from './../../places.service';
import { Place } from './../../places.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  loadedPlaces: Place;
  constructor(private activatedRoute: ActivatedRoute,private router: Router
    ,private placesService: PlacesService
    ,private modalCtrl: ModalController
    ,private loadingCtrl: LoadingController
    ,private actionSheetCtrl : ActionSheetController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap=>{
        if(!paramMap.has('placeId')){return;}
        this.loadedPlaces = this.placesService.getPlaces(paramMap.get('placeId'));
      }
    )
  }
  goBack(){
    this.router.navigateByUrl('/places/tabs/discover');
  }
  bookPlace(){
    this.modalCtrl.create({
      component: CreateBookingComponent
    })
    .then(modalElement => {
      modalElement.present();
    });
  }
  bookThisPlace(){
    this.loadingCtrl.create({
      keyboardClose: true,
      message:'Booking the place ...'
    })
    .then(loadingEl =>{
      loadingEl.present();
      setTimeout(()=>{
        loadingEl.dismiss();
        this.modalCtrl.dismiss({message: 'Booked!'},
        'confirm');
      },2000);
    })
  }

  /*async bookSheetPlace(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Book Place',
      buttons: [{
        text: 'Book w/ Random Date',
        handler: () => {
          this.modalCtrl.create({component:CreateBookingComponent,
          componentProps: { selectedPlace: this.loadedPlaces } })
          .then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
          })
          .then(resultData=>{
            console.log(resultData);
          });
        }
      }, {
          text:'Cancel',
          role:'cancel',
          handler: () =>{
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }*/
  onBookPlace(){
    this.actionSheetCtrl.create({
      header:'Choose an action',
      buttons:[
        {
          text:'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text:'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
          {
            text:'Cancel',
            role:'cancel'
          }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }
  openBookingModal(mode:'select' | 'random'){
    console.log(mode);
    this.modalCtrl.create({
      component:CreateBookingComponent,
      componentProps:{selectedplace:this.loadedPlaces}
    })
    .then(modalEl =>{
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data,resultData.role);
      if(resultData.role === 'confirm'){
        console.log('Booked');
      }
    });
  }
}
