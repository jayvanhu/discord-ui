import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'src/encryption'
import { UserEntity } from 'src/data/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
		console.log('Seeding')

		const email =  'asdf@gmail.com'
		const user: CreateUserDto = {
			email,
			username: 'test-name',
			password: hash('foo'),
		}

		repo.save({ ...user, id: 1 }).then(res => {
			console.log('Seeded: ', res)
		})

	}

	// TODO add nestjs validation decorators
	async signup(user: CreateUserDto) {
		const { email } = user

		const existingUser = await this.repo.findOne({ where: { email } })
		if (existingUser) {
			throw new BadRequestException('Email already taken.')
		} else {
			return this.createUser(user)
		}
	}

	createUser(userDto: CreateUserDto) {
		userDto.password = hash(userDto.password)
		return this.repo.insert(userDto)
	}

	findOneById(id: number): Promise<UserEntity> {
		return this.repo.findOne(id)
	}

	findOneByEmail(email: string): Promise<UserEntity> {
		return this.repo.findOne({ where: { email } })
	}

}
