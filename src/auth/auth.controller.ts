import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() loginDto: LoginDTO): Promise<{ token: string }> {
        const token = await this.authService.validateUserAndGenerateToken(loginDto.username, loginDto.password);

        if (!token) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return { token };
    }
}
