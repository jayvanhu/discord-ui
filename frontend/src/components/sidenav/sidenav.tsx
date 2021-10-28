import { NavLink } from 'react-router-dom'
import { FaDiscord } from 'react-icons/fa'
import './sidenav.scss'

import { makeBemRoot, randomInt } from '@src/helpers'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function makeSidenavItemName() {
	const length = letters.length
	const idx1 = randomInt(length)
	const idx2 = randomInt(length)
	return letters[idx1] + letters[idx2]
}

const bem = makeBemRoot('chat-sidenav')

export function Sidenav() {
	return <nav className={bem()} aria-label='chat navigation'>
		<NavLink className={bem('item')} to='todo' aria-label='dashboard'>
			<FaDiscord />
		</NavLink>
		<NavLink className={bem('item')} to='foo'>{makeSidenavItemName()}</NavLink>
		<NavLink className={bem('item')} to='foo' >{makeSidenavItemName()}</NavLink>
	</nav>
}
