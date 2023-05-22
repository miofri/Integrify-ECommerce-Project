import { AllProductsInterface } from "../../interface/productsInterface";

export const handleSortByName = (
  products: AllProductsInterface[],
  setProducts: React.Dispatch<React.SetStateAction<AllProductsInterface[]>>
) => {
  const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
  setProducts(sorted);
};

export const handleSortByPriceAscending = (
  products: AllProductsInterface[],
  setProducts: React.Dispatch<React.SetStateAction<AllProductsInterface[]>>
) => {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  setProducts(sorted);
};

export const handleSortByPriceDescending = (
  products: AllProductsInterface[],
  setProducts: React.Dispatch<React.SetStateAction<AllProductsInterface[]>>
) => {
  const sorted = [...products].sort((a, b) => b.price - a.price);
  setProducts(sorted);
};
