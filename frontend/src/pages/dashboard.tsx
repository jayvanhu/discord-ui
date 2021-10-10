import { useQuery } from "@apollo/client"

// todo path
import { queryUser } from "@src/api"

export function Dashboard() {
	const { loading, error, data } = useQuery<string>(queryUser)

	if (error) return <h1>error foo</h1>
	return <div>
		<h1>dashbaord</h1>
		<p>{JSON.stringify(data)}</p>
	</div>
}
