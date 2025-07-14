import { Module } from '@nestjs/common';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [ShoppingCartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
