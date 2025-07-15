import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get(":shoppingCartId")
    async getShoppingCart(@Param("shoppingCartId") shoppingCartId: string): Promise<ShoppingCart> {
        return await this.shoppingCartService.getShoppingCart(shoppingCartId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getAllShoppingCarts(): Promise<ShoppingCart[]> {
        return await this.shoppingCartService.getAllShoppingCarts();
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    async createShoppingCart(@Req() req): Promise<ShoppingCart> {
        const userId = req.user.userId;
        return await this.shoppingCartService.createShoppingCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:cartId/product/:productId")
    async addProductToShoppingCart(@Req() req, @Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        const userId = req.user.userId;
        return await this.shoppingCartService.addProductToShoppingCart(cartId, productId, userId);
    }

    @Delete("/:cartId/product/:productId")
    async removeProductFromShoppingCart(@Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        return await this.shoppingCartService.removeProductFromShoppingCart(cartId, productId);
    }

    @Get("/user/:userId")
    async getUserShoppingCarts(@Param("userId") userId: string): Promise<ShoppingCart[]> {
        return await this.shoppingCartService.getUserShoppingCarts(userId);
    }

    @Post(':id/process')
    async processCart(@Param('id') cartId: string, @Res() res: Response) {
        this.shoppingCartService.processCartAsync(cartId); // sin await
        return res.status(HttpStatus.ACCEPTED).json({ message: 'Estamos procesando su orden' });
    }
}
