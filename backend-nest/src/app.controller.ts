import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Req() req: Request, @Res() res: Response) {
		const jwtRes = await this.authService.login(req.user)
		res.cookie('refresh', jwtRes.refreshToken, {
			httpOnly: true,
		})
		return res.json({
			accessToken: jwtRes.accessToken,
		})
	}

	@UseGuards(JwtAuthGuard)
	@Post('auth/test')
	async test (@Req() req: Request) {
		return req.user
	}

}
