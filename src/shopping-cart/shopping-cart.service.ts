import { Injectable } from '@nestjs/common';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Injectable()
export class ShoppingCartService {

    private shoppingCartList: ShoppingCart[] = [
        {id: "123", userId: "u123", products: []},
        {id: "456", userId: "u231", products: [
            {id: "p123", category: "books", name: "Martin Fierro", price: 123.45}
        ]},
    ];

    getShoppingCart(shoppingCartId: string): ShoppingCart | undefined {
        return this.shoppingCartList.find(sc => sc.id === shoppingCartId);
    }
}
