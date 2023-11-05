import axios from 'axios';
import type { IApiResponse}  from '@/interfaces/IApiResponse';

class GetProductCardListService 
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
        const response = await axios.get<IApiResponse>("http://localhost:8000/api/productsCardList");
        this.apiResponse = response.data;
    }
}
export default GetProductCardListService;