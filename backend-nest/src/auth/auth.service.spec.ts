import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test } from '@nestjs/testing'
import { hash } from 'src/encryption'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

describe(AuthService.name, () => {
	let service: AuthService
	let usersService: UsersService

	const email = 'user@gmail.com'
	const password = 'foobar'

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			imports: [
				PassportModule,
				JwtModule.register({
					secret: 'foo',
				}),
			],
			providers: [
				AuthService, LocalStrategy,
				{
					provide: UsersService,
					useValue: {
						findOneByEmail: jest.fn().mockResolvedValue({ email, password: hash(password) }),
					},
				}
			],
		}).compile()

		service = module.get(AuthService)
		usersService = module.get(UsersService)
	})

	it('authenticates user', async () => {
		const res = await service.validateUser(email, password)
		expect(res).toBeTruthy()
		expect(res.email).toBe(email)
	})

	it('fails to authenticate user if it doesn\'t exist', async () => {
		jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null)
		const res = await service.validateUser('no return', password)
		expect(res).toBeFalsy()
	})

	it('fails to authenticate user with email but wrong password', async () => {
		const res = await service.validateUser(email, 'wrong password')
		expect(res).toBeFalsy()
	})

})
