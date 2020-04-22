export interface IBillAgreementDTO {
  flat: number;
  name: string;
  rate: number;
  is_dynamic: boolean;
}

export interface IBillsAgreement extends IBillAgreementDTO {
  id: number;
}

interface IFlatHistory {
  id: number;
  flat: number;
  date: string;
  total: number;
}

export interface IBillHistory extends IFlatHistory {
  bill: string;
  value: number;
  rate: number;
  difference: number;
}

export interface IPayment extends IFlatHistory {
  bills: number;
  tenant: string;
  rental_rate: number;
}

export interface IBillHistoryDTO {
  flat: number;
  bill: number;
  value: number;
}

export interface IPaymentDTO {
  flat: number;
  date: string;
  tenant: number;
}
