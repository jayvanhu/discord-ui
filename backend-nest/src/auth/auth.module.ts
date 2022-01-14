import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { appConfig } from 'src/config'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: appConfig.jwtSecret,
			signOptions: { expiresIn: appConfig.jwtExpiration }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
