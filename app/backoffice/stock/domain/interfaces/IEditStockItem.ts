import type { IBaseStockItem } from '@app/backoffice/stock/domain/interfaces/IBaseStockItem'

export interface IEditStockItem extends IBaseStockItem {
  movement_type: string;
  product_name: string;
}
