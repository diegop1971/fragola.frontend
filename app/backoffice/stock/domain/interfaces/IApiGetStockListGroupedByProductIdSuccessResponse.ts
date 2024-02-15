export interface IApiGetStockListGroupedByProductIdSuccessResponse {
    title: string;
    stockItem: [{
        items: number
        id: string,
        name:string,
        quantity: number
    }];
}
