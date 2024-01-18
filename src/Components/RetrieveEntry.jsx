import { useContext, useState } from 'react'
import PageHeading from './PageHeading'
import { DataContext } from '../Context'

const RetrieveEntry = () => {
	const data = useContext(DataContext).data
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [searched, setSearched] = useState(false)

	/**
	 * Handles the click event for the retrieve button.
	 *
	 * @param {object} e - The event object.
	 * @return {void}
	 */
	const handleRetrieveClick = (e) => {
		e.preventDefault()
		setSearched(true)

		if (searchQuery.length !== 12) {
			alert('Aadhar Number must be 12 digits long')
			return
		}

		const result = data.filter((item) => item.adhaar === searchQuery)
		setSearchResult(result)
	}

	return (
		<section className='p-6'>
			<PageHeading title='Retrieve Information' />
			<h3 className='text-xl font-semibold mb-4'>Enter Aadhar Number</h3>
			<form className='flex gap-4 mb-8 items-center flex-wrap'>
				<input
					type='number'
					inputMode='numeric'
					className='input input-bordered'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button
					className='btn btn-accent'
					type='submit'
					onClick={handleRetrieveClick}
				>
					Retrieve
				</button>
			</form>
			{searchResult.length > 0 ? (
				<div>
					<h3 className='text-xl font-medium mb-4'>Search Result</h3>
					<table className='table'>
						<thead>
							<tr>
								<th className='lg:w-98'>Name</th>
								<th className='lg:w-48'>Date of Birth</th>
								<th className='lg:w-64'>Aadhar Number</th>
								<th className='lg:w-64'>Phone Number</th>
								<th>Age</th>
							</tr>
						</thead>
						<tbody>
							{searchResult.map((item) => (
								<tr key={item.id}>
									<td>{item.name}</td>
									<td>{item.dob}</td>
									<td>{item.adhaar}</td>
									<td>{item.phone}</td>
									<td>{item.age}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : searched ? (
				<h3 className='text-xl font-medium mb-4 text-red-600'>
					No data found
				</h3>
			) : (
				<h3 className='text-xl font-medium mb-4 text-red-900'>
					Enter a query to retrieve user information
				</h3>
			)}
		</section>
	)
}

export default RetrieveEntry
