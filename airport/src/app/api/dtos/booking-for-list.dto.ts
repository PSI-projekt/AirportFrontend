import {FlightDetailsDto} from './flight-details.dto';
import {PassengerForEditDto} from './passenger-for-edit.dto';

export interface BookingForListDto {
  id: number;
  userId: number;
  dateOfBooking: string;
  isCancelled: boolean;
  numberOfPassengers: number;
  flightDetails: FlightDetailsDto;
  passengers: Array<PassengerForEditDto>;
}
