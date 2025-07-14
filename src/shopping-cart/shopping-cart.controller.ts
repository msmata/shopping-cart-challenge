import { Controller, Get, Param } from '@nestjs/common';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get(":shoppingCartId")
    getShoppingCart(@Param("shoppingCartId") shoppingCartId: string): ShoppingCart | undefined {
        return this.shoppingCartService.getShoppingCart(shoppingCartId);
    }
}
