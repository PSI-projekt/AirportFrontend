import {AirportForListDto} from './airport-for-list.dto';
import {AirplaneForBookingDto} from './airplane-for-booking.dto';

export interface FlightDetailsDto {
  id: number;
  dateOfDeparture: string;
  dateOfArrival: string;
  timeOfDeparture: string;
  timeOfArrival: string;
  origin: AirportForListDto;
  destination: AirportForListDto;
  flightNumber: string;
  airplane: AirplaneForBookingDto;
}
