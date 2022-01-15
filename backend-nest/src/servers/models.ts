import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Server {
	@Field(type => Int)
	id: number;

	@Field()
	name: string;

	// TODO add user reference?
}
