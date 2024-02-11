import type { IBaseStockList } from '@app/backoffice/stock/domain/interfaces/IBaseStockList'

export interface IViewStockList extends IBaseStockList {
  date: string;
  notes: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}
