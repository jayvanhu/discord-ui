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

	/// Business Logic
	async signup(user: CreateUserDto) {
		const existingUser = await this.repo.findOne({ where: { email: user.email } })
		if (existingUser) {
			throw new BadRequestException('Email already taken.')
		} else {
			return this.createUser(user)
		}
	}

	async login(email: string, password: string ) {
		// book todo
		const encrypted = hash(password)
		const result = await this.repo.findOne({ where: { email, password: encrypted } })
		if (result) {
			//
		} else {
			//
		}
	}

	/// Repository
	findOneById(id: number) {
		return this.repo.findOne(id)
	}

	findOneByEmail(email: string) {
		return this.repo.findOne({ where: { email } })
	}

	createUser(userDto: CreateUserDto) {
		userDto.password = hash(userDto.password)
		return this.repo.insert(userDto)
	}

}
