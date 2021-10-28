import { HashRouter as Router } from 'react-router-dom'
import './App.css'
import '@styles/global.scss'

import { Dashboard } from './pages/dashboard'

function App() {
	return <div className="App">
		<Router>
			<Dashboard></Dashboard>
		</Router>
	</div>
}

export default App
