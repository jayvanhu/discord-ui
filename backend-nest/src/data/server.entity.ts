import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity()
export class ServerEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	// TODO should both owner and members map to user.servers for the relation?
	// TODO can maybe try implementing an ownership transfer logic?
	@ManyToOne(() => UserEntity, user => user.ownedServers, { onDelete: 'CASCADE' })
	owner: UserEntity

	@ManyToMany(() => UserEntity, user => user.servers)
	@JoinTable()
	members: UserEntity[]

}
