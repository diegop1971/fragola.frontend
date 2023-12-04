import axios from 'axios';
import type { IProduct }  from '@app/backoffice/products/domain/interfaces/IProduct';

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
            this.apiResponse = response.data; // Ahora response.data es un array de IProduct
        } catch (error) {
            console.error("Error fetching product list:", error);
            throw error; // O maneja el error de alguna otra manera
        }
    }
}

export default GetProductListService;
