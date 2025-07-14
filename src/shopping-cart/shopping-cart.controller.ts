import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get(":shoppingCartId")
    async getShoppingCart(@Param("shoppingCartId") shoppingCartId: string): Promise<ShoppingCart> {
        return await this.shoppingCartService.getShoppingCart(shoppingCartId);
    }

    @Get("")
    async getAllShoppingCarts(): Promise<ShoppingCart[]> {
        return await this.shoppingCartService.getAllShoppingCarts();
    }

    @Post("")
    async createShoppingCart(@Body('userId') userId: string): Promise<ShoppingCart> {
        return await this.shoppingCartService.createShoppingCart(userId);
    }

    @Put("/:cartId/product/:productId")
    async addProductToShoppingCart(@Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        return await this.shoppingCartService.addProductToShoppingCart(cartId, productId);
    }

    @Delete("/:cartId/product/:productId")
    async removeProductFromShoppingCart(@Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        return await this.shoppingCartService.removeProductFromShoppingCart(cartId, productId);
    }

    @Get("/user/:userId")
    async getUserShoppingCarts(@Param("userId") userId: string): Promise<ShoppingCart[]> {
        return await this.shoppingCartService.getUserShoppingCarts(userId);
    }
}
