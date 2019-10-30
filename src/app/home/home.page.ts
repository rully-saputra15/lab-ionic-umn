import { NewBookingPage } from './new-booking/new-booking.page';
import { BookingService } from './booking.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.interface';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  private bookings: Booking[] = [];
  constructor(
    private bookingSvc: BookingService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
  ngOnInit(){

  }
  getBookings(){
    this.bookingSvc.fetchBookings()
    .subscribe((bookings)=>{
      console.log(bookings);
    });
  }
  async presentAlertPrompt(){
    const alert = await this.alertCtrl.create({
      header: 'Delete a booking',
      inputs: [
        {
          name: 'bookingId',
          type: 'text',
          placeholder: 'Enter your booking ID'
        },
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () =>{
            console.log('Confirm Cancel');
          }
        },{
          text: 'Ok',
          handler: (data)=>{
            this.bookingSvc.deleteBooking(data.bookingId)
            .subscribe(()=>{
              this.bookingSvc.fetchBookings()
                .subscribe((bookings)=>{
                  console.log(bookings);
                });
                console.log("DELETED");
            })
          }
        }
      ]
    });
    await alert.present();
  }
  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: NewBookingPage
    });
    return await modal.present();
  }
  newBookings(){
    this.presentModal();
  }
  deleteBookings(){
    this.presentAlertPrompt();
  }
}
