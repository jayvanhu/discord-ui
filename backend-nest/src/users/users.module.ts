import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
	],
	providers: [UsersService, UsersResolver],
	exports: [UsersService, UsersResolver],
})
export class UsersModule {}
