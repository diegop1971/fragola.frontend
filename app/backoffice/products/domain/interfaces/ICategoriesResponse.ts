import type { ICategory } from "@app/backoffice/products/domain/interfaces/ICategory"

export interface ICategoriesResponse {
  title: string
  categoriesList: ICategory[]
}
