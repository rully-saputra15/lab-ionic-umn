import { Injectable } from '@angular/core';
import { Booking } from './bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookings : Booking[] = [
    new Booking(
      'b1',
      'p1',
      'u1',
      'Gading Apartment',
      4
    ),
    new Booking(
      'b2',
      'p2',
      'u2',
      'Serpong Apartment',
      8
    )
  ];
  getAllBookings(){
    return [...this.bookings];
  }
  deleteBooking(id:String){
    var filtered= this.bookings.filter(bookings=>{
      return bookings.id !== id
    })
    this.bookings = filtered;
    return this.bookings;
  }
  constructor() { }
}
