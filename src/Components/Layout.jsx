import Header from './Header'

import { Outlet } from 'react-router-dom'
const Layout = () => {
	return (
		<div className='min-h-screen w-screen'>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
