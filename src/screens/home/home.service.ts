import { ApiService } from '../../services/api.service';
import { IFlat } from 'src/typings';

class HomeService extends ApiService {
  public async getFlats(userId: number) {
    return await this.get<IFlat[]>(`flats/${userId}`);
  }
  public async createFlat(address: string, userId: number) {
    return await this.post<IFlat>('flat', {
      address,
      owner: userId,
    });
  }
}

export const homeService = new HomeService();
