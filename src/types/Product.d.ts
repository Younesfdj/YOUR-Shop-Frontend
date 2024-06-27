declare interface ProductImageI {
  ProductImageId: number;
  ProductImagePath: string;
  ProductId: number;
}

declare interface ProductI {
  ProductId: number;
  ProductName: string;
  ProductSKU: string;
  ProductPrice: number;
  ProductDesc: string;
  ProductQuantity: number;
  ProductCategoryId: number;
  ProductSizes: string;
  ProductGallery: ProductImageI[] | [];
}
