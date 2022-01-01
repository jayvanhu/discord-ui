import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from 'src/data/user.entity'
import { Repository } from 'typeorm'
import { UsersService } from './users.service'

describe(UsersService.name, () => {
	let service: UsersService
	let repo: Repository<UserEntity>

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: {
						save: jest.fn().mockResolvedValue({}),
						findOne: jest.fn().mockResolvedValue({ email: 'existing@gmail.com' }),
						insert: jest.fn(),
					},
				}
			]
		}).compile()

		service = module.get(UsersService)
		repo = module.get(getRepositoryToken(UserEntity))
	})

	it('fails signup because email already exists', async () => {
		const email = 'existing@gmail.com'
		const errorMsg = 'Email already taken.'

		try {
			await service.signup({ email, username: '', password: '' })
			fail('User created with an email that already existed')
		} catch (err) {
			expect(err.message).toBe(errorMsg)
		}
	})

	it.todo('requires signup fields')

})
