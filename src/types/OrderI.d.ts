declare interface OrderI {
  OrderFName: string;
  OrderLName: string;
  OrderAmount: number;
  OrderPhone: string;
  OrderWilaya: string;
  OrderCommune: string;
  OrderShippingMode: string;
  OrderStatus: string;
  OrderId?: number | undefined;
  OrderDate?: Date | string | undefined;
  createdAt?: Date | string | undefined;
  updatedAt?: Date | string | undefined;
}
