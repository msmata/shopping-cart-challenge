import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { SeedModule } from './shopping-cart/seed.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace disponible process.env en toda la app sin importar el módulo
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SeedModule,
    ShoppingCartModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
