const Header = () => {
	return (
		<div>
			<header className='bg-base-300 p-4'>
				<h2 className='text-2xl text-center font-bold'>Directory App</h2>
			</header>
			<nav className='flex justify-center items-center mt-4'>
				<ul className='flex gap-x-6 gap-y-2 flex-wrap justify-center items-center'>
					<li>
						<button className='btn btn-secondary w-48'>
							Add new entry
						</button>
					</li>
					<li>
						<button className='btn btn-accent w-48'>
							Retrieve Information
						</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Header
