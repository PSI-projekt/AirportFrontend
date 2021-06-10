export interface AirplaneForListDto {
    id: number;
    maker: string;
    model: string;
    identifier: string;
    locationId: number;
    airline: string;
    numberOfSeats: number;
    isInRepair: boolean;    
  }