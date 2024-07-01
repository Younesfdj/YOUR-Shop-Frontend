declare interface OrderDetailI {
  DetailOrderId: number;
  DetailProductId: number;
  DetailQuantity: number;
  DetailId: number;
  DetailProductName:string;
  DetailProductPrice:number;
  OrderSize:string
  createdAt?: string;
  updatedAt?: string;
}
