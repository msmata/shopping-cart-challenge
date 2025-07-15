import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginDTO })
    @ApiResponse({ status: 201, description: 'JWT generado' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDTO): Promise<{ token: string }> {
        const token = await this.authService.validateUserAndGenerateToken(loginDto.username, loginDto.password);

        if (!token) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return { token };
    }
}
