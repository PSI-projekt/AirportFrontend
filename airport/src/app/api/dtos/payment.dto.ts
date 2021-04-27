export interface PaymentDto {
  swift: string;
  iban: string;
  amount: number;
  referenceNumber: string;
}
