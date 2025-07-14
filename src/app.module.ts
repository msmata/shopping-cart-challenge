import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SeedModule } from './shopping-cart/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SeedModule,
    ShoppingCartModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
