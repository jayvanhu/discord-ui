import { Sidenav } from '@components/sidenav/sidenav';
import { ChannelNav } from '@src/components/channel-nav/channel-nav';
import { MockSidenavService } from '@src/services/SidenavService';
import './dashboard.scss';

const sidenavService = new MockSidenavService();

export function Dashboard() {
	return <div className='dashboard'>
		<Sidenav service={sidenavService} />
		<ChannelNav />

		<main>
			{/* todo */}
		</main>
	</div>
}
