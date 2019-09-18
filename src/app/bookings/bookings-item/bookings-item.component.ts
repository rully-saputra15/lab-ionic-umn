import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/places.model';
import { Booking } from '../bookings.model';

@Component({
  selector: 'app-bookings-item',
  templateUrl: './bookings-item.component.html',
  styleUrls: ['./bookings-item.component.scss'],
})
export class BookingsItemComponent implements OnInit {
  @Input() booking:Booking;
  constructor() { }

  ngOnInit() {}

}
