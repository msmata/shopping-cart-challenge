import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ShoppingCartService {

    constructor(
        @InjectRepository(ShoppingCart)
        private readonly cartRepo: Repository<ShoppingCart>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
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

    createShoppingCart(userId: string): ShoppingCart | PromiseLike<ShoppingCart> {
        return this.cartRepo.save({products: [], userId});
    }

    async addProductToShoppingCart(cartId: string, productId: number): Promise<ShoppingCart> {
        const shoppingCart = await this.cartRepo.findOne({
            where: {id: cartId},
            relations: ['products']
        });

        if (!shoppingCart) {
            throw new NotFoundException(`Carrito con ID ${cartId} no encontrado`);
        }

        const product = await this.productRepo.findOneBy({id: productId});

        if (!product) {
            throw new NotFoundException(`Carrito con ID ${productId} no encontrado`);
        }

        shoppingCart.products.push(product);
        return await this.cartRepo.save(shoppingCart);
    }

    async removeProductFromShoppingCart(cartId: string, productId: number): Promise<ShoppingCart> {
        const shoppingCart = await this.cartRepo.findOne({
            where: {id: cartId},
            relations: ['products']
        });

        if (!shoppingCart) {
            throw new NotFoundException(`Carrito con ID ${cartId} no encontrado`);
        }

        shoppingCart.products = shoppingCart.products.filter(
            product => product.id != productId
        );

        return await this.cartRepo.save(shoppingCart);
    }
}
