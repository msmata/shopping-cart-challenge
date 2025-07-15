import { Body, Controller, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private readonly logger = new Logger(AuthController.name);

    @Post("login")
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginDTO })
    @ApiResponse({ status: 201, description: 'JWT generado' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDTO): Promise<{ token: string }> {
        this.logger.log("LoginDTO: ", loginDto);
        const token = await this.authService.validateUserAndGenerateToken(loginDto.username, loginDto.password);
        this.logger.log("Token: ", token);

        if (!token) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return { token };
    }
}
