import { IBillsAgreement, IBillHistory, IPayment } from './bills';

export interface IFlat {
  id: number;
  address: string;
  owner: number;
  days_before_payment: number;
  tenant: ITenant | null;
}

export interface IFlatDetails extends IFlat {
  tenant: ITenant | null;
  bills_agreement: IBillsAgreement[];
  bills_history: IBillHistory[];
  payment_history: IPayment[];
  to_pay: number;
}

export interface ITenantDTO {
  payment_day: number;
  signing_date: string;
  contract_time: number;
  rental_rate: number;
  deposit: number;
  name: string;
  phone: string;
  flat: number;
}

export interface ITenant extends ITenantDTO {
  id: number;
}
