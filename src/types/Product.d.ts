declare interface ProductI {
  ProductId: number;
  ProductName: string;
  ProductSKU: string;
  ProductPrice: number;
  ProductDesc: string;
  ProductQuantity: number;
  ProductCategoryId: number;
  ProductImagePath: string;
}

// ProductId: z.number().optional(),
//   ProductName: z.string().min(4),
//   ProductSKU: z.string().min(4),
//   ProductPrice: z.number().min(0),
//   ProductDesc: z.string().min(10),
//   ProductQuantity: z.number().min(0).default(1),
//   ProductCategoryId: z.number().min(1),
//   ProductImagePath: z.string().url(),
