import { Controller, Get, Param } from '@nestjs/common';
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
}
