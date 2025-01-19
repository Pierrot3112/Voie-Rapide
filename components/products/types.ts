// types.ts
export type RootStackParamList = {
    ProductDetails: { item: Product }; // Paramètre attendu dans la page ProductDetails
  };
  
  export interface Product {
    _id: string;
    title: string;
    supplier: string;
    price: string;
    imageUrl: string;
    description: string;
    product_location: string;
  }
  