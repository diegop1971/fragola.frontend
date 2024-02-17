import type { ICategory } from "@app/backoffice/stock/domain/interfaces/ICategory"

export interface ICategoriesResponse {
  title: string
  categoriesList: ICategory[]
}
