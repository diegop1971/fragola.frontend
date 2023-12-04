
import axios from 'axios';
import type { IProduct } from '@app/backoffice/products/domain/interfaces/IProduct';
import type { ICategory } from '@app/backoffice/products/domain/interfaces/ICategory';

class GetProductListService {
    private apiResponse: IProduct[] = [];

    constructor() {}

    public async getApiResponse(): Promise<IProduct[]> {
        await this.getProductList();
        return this.apiResponse;
    }

    private async getProductList(): Promise<void> {
        try {
            const response = await axios.get<IProduct[]>("http://localhost:8000/api/products/");

            this.apiResponse = response.data.map((product: IProduct) => {
                const category: ICategory = product.category; // Acceso a la categoría dentro del producto

                return {
                    ...product,
                    category // Asigna la categoría al producto en la nueva estructura
                };
            });
            
        } catch (error) {
            console.error("Error fetching product list:", error);
            throw error;
        }
    }
}

export default GetProductListService;
