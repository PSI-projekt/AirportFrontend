import {AirportForFlightDto} from './airport-for-flight.dto';

export interface FlightDto {
  id: number;
  dateOfDeparture: string;
  dateOfArrival: string;
  timeOfDeparture: string;
  timeOfArrival: string;
  flightNumber: string;
  status: string;
  pricePerPassenger: number;
  origin: AirportForFlightDto;
  destination: AirportForFlightDto;
}

