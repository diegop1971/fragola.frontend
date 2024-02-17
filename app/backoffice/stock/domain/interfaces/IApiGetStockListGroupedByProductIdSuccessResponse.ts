export interface IApiGetStockListGroupedByProductIdSuccessResponse {
    pageTitle: string;
    stockItem: [{
        items: number
        id: string,
        name:string,
        quantity: number
    }];
}
