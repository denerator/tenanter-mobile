import { BehaviorSubject } from 'rxjs';
import {
  IBillHistory,
  IFlatDetails,
  IBillsAgreement,
  ITenant,
  IPayment,
} from 'src/typings';

class FlatStore extends BehaviorSubject<IFlatDetails | null> {
  constructor(flat: IFlatDetails | null) {
    super(flat);
  }

  public addBillHistory(billHistoryEntry: IBillHistory) {
    if (!this.value) {
      return;
    }
    this.value.bills_history.push(billHistoryEntry);
    this.next(this.value);
  }

  public addBillAgreement(billAgreement: IBillsAgreement) {
    if (!this.value) {
      return;
    }
    this.value.bills_agreement.push(billAgreement);
    this.next(this.value);
  }

  public set tenant(tenant: ITenant) {
    if (!this.value) {
      return;
    }
    this.value.tenant = tenant;
    this.next(this.value);
  }

  public addPaymentRecord(record: IPayment) {
    if (!this.value) {
      return;
    }
    this.value.payment_history.push(record);
    this.next(this.value);
  }
}

export const flatStore = new FlatStore(null);
