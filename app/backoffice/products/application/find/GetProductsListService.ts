import axios from 'axios';
import type { IApiResponse}  from '@app/backoffice/products/domain/interfaces/IApiResponse';

class GetProductListService 
{
    private apiResponse:IApiResponse = {
        title: '',
        metaDescription: '',
        homeProducts: []
    };

    constructor() {}

    public async getApiResponse(): Promise<IApiResponse> {
        await this.getProductList();
        return this.apiResponse;
    }

    private async getProductList(): Promise<void> {
        const response = await axios.get<IApiResponse>("http://localhost:8000/api/categories/");
        this.apiResponse = response.data;
    }
}
export default GetProductListService;