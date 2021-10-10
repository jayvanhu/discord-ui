import { useState } from 'react'
import './App.css'

import { Dashboard } from './pages/dashboard'

function App() {
	const [count, setCount] = useState(0)

	return <div className="App">
		<Dashboard></Dashboard>
	</div>
}

export default App
