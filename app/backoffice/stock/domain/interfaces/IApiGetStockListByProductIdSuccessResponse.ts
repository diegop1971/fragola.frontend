export interface IApiGetStockListByProductIdSuccessResponse {
    pageTitle: string;
    stockItem: [{
        items: number
        id: string,
        name:string,
        quantity: number
    }];
}
