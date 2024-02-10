
import axios from 'axios';

import type { IApiGetProductsResponse } from '@app/backoffice/products/domain/interfaces/IApiGetProductsResponse';

class GetStockListService {

    private apiProductsResponse: IApiGetProductsResponse = {
        title: '',
        productList: {
                    id: '',
                    category_id: '',
                    category_name: '',
                    name: '',
                    description: '',
                    description_short: '',
                    price: 0,
                    minimum_quantity: 0,
                    low_stock_threshold: 0,
                    low_stock_alert: 0,
                    enabled: 0,
                    created_at: '',
                    updated_at: '',
                } 
    }

    constructor() {}

    public async getApiResponse(): Promise<IApiGetProductsResponse> {
        await this.getProductList();
        return this.apiProductsResponse;
    }

    private async getProductList(): Promise<void> {
        try {
            const response = await axios.get<IApiGetProductsResponse>("http://localhost:8000/api/stock/");
            this.apiProductsResponse = response.data;
        } catch (error) {
            console.error("Error fetching product list:", error);
            throw error;
        }
    }
}

export default GetStockListService;
