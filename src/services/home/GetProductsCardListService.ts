import axios, { AxiosError } from 'axios';
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
        try {
            await this.getProductList();
            return this.apiResponse;
        } catch (error) {
            throw error;
        }
    }

    private async getProductList(): Promise<void> {
        let response = await axios.get<IApiResponse>("http://localhost:8000/api/productsCardList");
        this.apiResponse = response.data;
    }
}
export default GetProductCardListService;