import axios from 'axios';
import type { IApiProductCardsResponse}  from '@app/frontoffice/catalog/domain/interfaces/IApiProductCardsResponse'

class GetProductCardListService 
{
    private apiResponse:IApiProductCardsResponse = {
        title: '',
        homeProducts: []
    };

    constructor() {}

    public async getApiResponse(): Promise<IApiProductCardsResponse> {
        await this.getProductList();
        return this.apiResponse;
    }

    private async getProductList(): Promise<void> {
        const response = await axios.get<IApiProductCardsResponse>("http://localhost:8000/api/productsCardList")
        this.apiResponse = response.data;
    }
}
export default GetProductCardListService;