import { PassengerForEditDto } from './passenger-for-edit.dto';

export interface BookingForEditDto {
  id: number;
  passengers: Array<PassengerForEditDto>;
}
