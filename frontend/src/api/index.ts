import { gql } from "@apollo/client";

export const queryUser = gql`
	query {
		user(id: 0) {
			username
		}
	}
`
