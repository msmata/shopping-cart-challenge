import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class ShoppingCartService {

    private readonly logger = new Logger(ShoppingCartService.name);

    constructor(
        @InjectRepository(ShoppingCart)
        private readonly cartRepo: Repository<ShoppingCart>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Discount)
        private readonly discountRepo: Repository<Discount>,
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

    async getUserShoppingCarts(userId: string): Promise<ShoppingCart[]> {
        const shoppingCarts = await this.cartRepo.find({
            where: {userId},
            relations: ['products']
        });

        return shoppingCarts;
    }

    async processCartAsync(cartId: string): Promise<void> {
        this.logger.log(`Procesando carrito ${cartId}...`);

        const cart = await this.cartRepo.findOne({
            where: { id: cartId },
            relations: ['products'],
        });

        if (!cart) {
            this.logger.warn(`Carrito con ID ${cartId} no encontrado`);
            throw new NotFoundException(`Carrito con ID ${cartId} no encontrado`);
        }

        let total = 0;

        const discounts = await this.discountRepo.find({});
        console.log("Discounts: ", discounts);

        for (const product of cart.products) {
            this.logger.log(`Looking for discounts por category ${product.category}`);
            const discount = await this.discountRepo.findOneBy({ category: product.category });
            this.logger.log(`Discount found: ${(discount?.percent || 0) * 100} %`);
            const percent = discount?.percent ?? 0;
            const finalPrice = product.price * (1 - percent);
            total += finalPrice;
        }

        this.logger.log(`Total con descuento para el carrito ${cartId}: $${total.toFixed(2)}`);

        // Simulamos validación y procesamiento
        await new Promise((resolve) => setTimeout(resolve, 3000));

        this.logger.log(`Orden del carrito ${cartId} procesada exitosamente`);
  }
}
