export interface FlightForAddDto {
  dateOfDeparture: Date;
  dateOfArrival: Date;
  originId: number;
  destinationId: number;
  flightNumber: string;
  gate: string;
  status: string;
  pricePerPassenger: number;
  airplaneId: number;
}
