import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from './server.entity';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({
		unique: true,
	})
	email: string

	@Column()
	username: string

	@Column()
	password: string

	@ManyToMany(() => ServerEntity, server => server.members)
	servers: ServerEntity[]

	@OneToMany(() => ServerEntity, server => server.owner)
	ownedServers: ServerEntity[]

}
