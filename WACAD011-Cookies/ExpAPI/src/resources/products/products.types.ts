export interface Products {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export type CreateProductDTO = Pick<Products, "name" | "price" | "stock">;

export type UpdateProductDTO = Partial<CreateProductDTO> & Pick<Products, "id">
