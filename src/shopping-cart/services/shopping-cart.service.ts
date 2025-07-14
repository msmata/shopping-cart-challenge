import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {

    constructor(
        @InjectRepository(ShoppingCart)
        private readonly cartRepo: Repository<ShoppingCart>,
    ) {}

    async getShoppingCart(shoppingCartId: string): Promise<ShoppingCart> {
        const cart = await this.cartRepo.findOne({
            where: { id: shoppingCartId },
            relations: ['products'],
        });

        if (!cart) {
            throw new NotFoundException(`Carrito con ID ${shoppingCartId} no encontrado`);
        }

        return cart;
    }

    getAllShoppingCarts(): ShoppingCart[] | PromiseLike<ShoppingCart[]> {
        return this.cartRepo.find({});
    }
}
