import './dashboard.scss'

import { Sidenav } from '@components/sidenav/sidenav'
import { ChannelNav } from '@src/components/channel-nav/channel-nav'

export function Dashboard() {
	return <div className='dashboard'>
		<Sidenav />
		<ChannelNav />

		<main>
			{/* todo */}
		</main>
	</div>
}
