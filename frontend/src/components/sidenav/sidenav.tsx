import { makeBemRoot, randomInt } from '@src/helpers'
import { SidenavNotification } from '@src/models/sidenav.model'
import { ISidenavService, MockSidenavService } from '@src/services/SidenavService'
import { useEffect, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './sidenav.scss'


const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function makeSidenavItemName() {
	const length = letters.length
	const idx1 = randomInt(length)
	const idx2 = randomInt(length)
	return letters[idx1] + letters[idx2]
}

const bem = makeBemRoot('chat-sidenav')

type Props = {
	// TODO should this be a fetcher?
	servers?: string[]
	service: ISidenavService
}

export function Sidenav({ servers, service }: Props) {
	const [newMessageNotifications, setNotifs] = useState(() => service.getNotifications())
	useEffect(() => {
		service.subscribeToNotifications((newNotif: SidenavNotification) => {
			setNotifs([
				...newMessageNotifications,
				newNotif
			])
		})
		return () => {
			service.unsubscribeToNotifications()
		}
	}, [])

	return <nav className={bem()} aria-label='chat navigation'>
		<NavLink className={bem('item')} to='todo' aria-label='dashboard'>
			<FaDiscord />
		</NavLink>

		{
			newMessageNotifications?.map(notif => {
				return <NavLink key={notif.id} className='' to={notif.id.toString()} aria-label='new message' onClick={() => {
					const remainingNotifications = service.markNotificationAsRead(notif)
					setNotifs(remainingNotifications)
				}}>{ notif.name }</NavLink>
			})
		}

		{/* todo */}
		<NavLink className={bem('item')} to='foo'>{makeSidenavItemName()}</NavLink>
		<NavLink className={bem('item')} to='foo' >{makeSidenavItemName()}</NavLink>
	</nav>
}
