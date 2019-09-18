import { Component, OnInit } from '@angular/core';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings : Booking[];
  constructor(private menuCtrl:MenuController,private bookingsService : BookingsService) { }

  ngOnInit() {
    this.bookings = this.bookingsService.getAllBookings();
  }
  onOpenMenu(){
    this.menuCtrl.toggle('m1');
  }
  deleteBookings(id:String,slidingEl: IonItemSliding){
    slidingEl.close();
    this.bookings = this.bookingsService.deleteBooking(id);
  }
}
