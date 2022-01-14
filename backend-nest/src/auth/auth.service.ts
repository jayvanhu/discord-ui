import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'src/encryption';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwt: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<Express.User> {
		const user = await this.usersService.findOneByEmail(email)
		if (user?.password === hash(pass)) {
			const { password, ...result } = user;
			return result
		}
		return null
	}

	/**
	 * Takes validated User data and signs it into an access token.
	 */
	async login(user: Express.User) {
		// TODO does there need to be payload data?
		const refreshPayload = {}

		return {
			accessToken: this.jwt.sign(user),
			refreshToken: this.jwt.sign(refreshPayload),
		}
	}

}
