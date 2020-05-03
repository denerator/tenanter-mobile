import { ApiService } from './api.service';
import * as types from '../typings';

class FlatService extends ApiService {
  public async getFlatDetails(flatId: number) {
    return await this.get<types.IFlatDetails>(`flat/${flatId}`);
  }

  public async saveBillValue(params: types.IBillHistoryDTO) {
    return await this.post<types.IBillHistory>('bills/history', params);
  }

  public async saveBill(params: types.IBillAgreementDTO) {
    return await this.post<types.IBillsAgreement>('bills/agreement', params);
  }

  public async savePayment(params: types.IPaymentDTO) {
    return await this.post<types.IPayment>('payment', params);
  }

  public async saveTenant(params: types.ITenantDTO) {
    return await this.post<types.ITenant>('tenant', params);
  }

  public async updateTenant(params: types.ITenant) {
    return await this.put<types.ITenant>(`tenant/${params.id}`, params);
  }
  public async getFlats(userId: number) {
    return await this.get<types.IFlat[]>(`flats/${userId}`);
  }
  public async createFlat(address: string, userId: number) {
    return await this.post<types.IFlat>('flat', {
      address,
      owner: userId,
    });
  }
}

export const flatService = new FlatService();
