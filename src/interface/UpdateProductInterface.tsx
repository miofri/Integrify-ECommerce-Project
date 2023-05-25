import { Category } from "./SingleProductInterface";

export interface ImagesObject {
  img1?: string;
  img2?: string;
  img3?: string;
}
export interface ProductVals {
  id: number;
  title?: string;
  description?: string;
  categoryId?: number;
  price?: number;
  imagesObj?: ImagesObject;
  images?: string[];
}
export interface optionalId {
  id?: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface updateImg {
  id?: number;
  newImg?: string;
}
