import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Carrito de Compras')
@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getAllShoppingCarts(): Promise<ShoppingCart[]> {
        return await this.shoppingCartService.getAllShoppingCarts();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Crear nuevo carrito para el usuario autenticado' })
    @ApiResponse({ status: 201, description: 'Carrito creado' })
    @Post("")
    async createShoppingCart(@Req() req): Promise<ShoppingCart> {
        const userId = req.user.userId;
        return await this.shoppingCartService.createShoppingCart(userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Agrega producto al carrito si pertenece al usuario autenticado' })
    @ApiParam({ name: 'cartId', description: 'ID del carrito', type: String })
    @ApiParam({ name: 'productId', description: 'ID del producto a agregar', type: Number })
    @Put("/:cartId/product/:productId")
    async addProductToShoppingCart(@Req() req, @Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        const userId = req.user.userId;
        return await this.shoppingCartService.addProductToShoppingCart(cartId, productId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Remueve producto del carrito si pertenece al usuario autenticado' })
    @ApiParam({ name: 'cartId', description: 'ID del carrito', type: String })
    @ApiParam({ name: 'productId', description: 'ID del producto a remover', type: Number })
    @Delete("/:cartId/product/:productId")
    async removeProductFromShoppingCart(@Req() req, @Param("cartId") cartId: string, @Param("productId") productId: number): Promise<ShoppingCart> {
        const userId = req.user.userId;
        return await this.shoppingCartService.removeProductFromShoppingCart(cartId, productId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtiene carritos del usuario autenticado' })
    @Get("/user")
    async getUserShoppingCarts(@Req() req): Promise<ShoppingCart[]> {
        const userId = req.user.userId;
        return await this.shoppingCartService.getUserShoppingCarts(userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Procesa un carrito si pertenece al usuario autenticado' })
    @ApiParam({ name: 'id', description: 'ID del carrito', type: String })
    @Post(':id/process')
    async processCart(@Req() req, @Param('id') cartId: string, @Res() res: Response) {
        const userId = req.user.userId;
        this.shoppingCartService.processCartAsync(cartId, userId); // sin await
        return res.status(HttpStatus.ACCEPTED).json({ message: 'Estamos procesando su orden' });
    }
}
