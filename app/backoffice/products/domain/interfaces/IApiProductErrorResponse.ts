export interface IApiProductErrorResponse {
  errors: {
    success: boolean;
    message: string;
    status: number;
  };
}