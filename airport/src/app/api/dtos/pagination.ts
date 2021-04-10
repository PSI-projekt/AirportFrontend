import {FlightDto} from './flight.dto';

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: Array<FlightDto> | undefined;
  pagination: Pagination | undefined;
}
