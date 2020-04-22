import { ApiService } from '../../services/api.service';
import {
  IFlatDetails,
  IBillHistoryDTO,
  IBillHistory,
  IPaymentDTO,
  IPayment,
  IBillAgreementDTO,
  IBillsAgreement,
  ITenant,
  ITenantDTO,
} from '../../typings';

class FlatService extends ApiService {
  public async getFlatDetails(flatId: number) {
    return await this.get<IFlatDetails>(`flat/${flatId}`);
  }

  public async saveBillValue(params: IBillHistoryDTO) {
    return await this.post<IBillHistory>('bills/history', params);
  }

  public async saveBill(params: IBillAgreementDTO) {
    return await this.post<IBillsAgreement>('bills/agreement', params);
  }

  public async savePayment(params: IPaymentDTO) {
    return await this.post<IPayment>('payment', params);
  }

  public async saveTenant(params: ITenantDTO) {
    return await this.post<ITenant>('tenant', params);
  }

  public async updateTenant(params: ITenant) {
    return await this.put<ITenant>(`tenant/${params.id}`, params);
  }
}

export const flatService = new FlatService();
