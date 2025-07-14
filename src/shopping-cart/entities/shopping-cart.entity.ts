import { Product } from "./product.entity";

export class ShoppingCart {
    id: string;
    userId: string;
    products: Product[];
}