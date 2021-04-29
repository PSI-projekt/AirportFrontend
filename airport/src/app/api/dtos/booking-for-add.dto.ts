import {PassengerForBookingDto} from './passenger-for-booking.dto';

export interface BookingForAddDto {
  flightId: number;
  passengers: Array<PassengerForBookingDto>;
}
