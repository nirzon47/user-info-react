import PageHeading from './PageHeading'
import { DataContext } from '../Context'
import { useContext, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

const AddEntry = () => {
	const context = useContext(DataContext)

	const [showInput, setShowInput] = useState(false)

	const nameRef = useRef()
	const dobRef = useRef()
	const adhaarRef = useRef()
	const phoneRef = useRef()

	const toggleInput = () => {
		setShowInput(!showInput)
	}

	const getAge = (dateString) => {
		const today = new Date()
		const birthDate = new Date(dateString)
		let age = today.getFullYear() - birthDate.getFullYear()
		const month = today.getMonth() - birthDate.getMonth()

		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		return age
	}

	const addData = () => {
		const name = nameRef.current.value
		const dob = dobRef.current.value
		const adhaar = adhaarRef.current.value
		const phone = phoneRef.current.value
		const age = getAge(dob)

		context.updateData({
			id: nanoid(),
			name,
			dob,
			adhaar,
			phone,
			age,
		})

		nameRef.current.value = ''
		dobRef.current.value = ''
		adhaarRef.current.value = ''
		phoneRef.current.value = ''
	}

	return (
		<section className='p-6'>
			<PageHeading title='Add Entry' />
			<button className='btn btn-primary btn-sm mb-4' onClick={toggleInput}>
				{!showInput ? 'Click to add new data' : 'Close the form'}
			</button>
			<div className='overflow-x-auto'>
				<table className='table'>
					<thead>
						<tr>
							<th className='lg:w-98'>Name</th>
							<th className='lg:w-48'>Date of Birth</th>
							<th className='lg:w-64'>Aadhar Number</th>
							<th className='lg:w-64'>Phone Number</th>
							<th>Age</th>
							<th className='lg:w-28'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{showInput && (
							<tr>
								<td>
									<input
										ref={nameRef}
										type='text'
										className='input input-bordered input-sm'
									/>
								</td>
								<td>
									<input
										ref={dobRef}
										type='date'
										className='input input-bordered input-sm'
									/>
								</td>
								<td>
									<input
										ref={adhaarRef}
										type='number'
										inputMode='numeric'
										className='input input-bordered input-sm w-11/12 pr-0'
										min={1000000000}
										max={9999999999}
									/>
								</td>
								<td>
									<input
										ref={phoneRef}
										type='number'
										inputMode='numeric'
										className='input input-bordered input-sm w-11/12 pr-0'
										min={1000000000}
										max={9999999999}
									/>
								</td>
								<td></td>
								<td>
									<button
										className='btn btn-primary btn-sm'
										onClick={addData}
									>
										Add
									</button>
								</td>
							</tr>
						)}
						{context.data.map((user) => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.dob}</td>
								<td>{user.adhaar}</td>
								<td>{user.phone}</td>
								<td>{user.age}</td>
								<td>
									<button
										className='btn btn-error btn-sm'
										onClick={() => context.removeData(user.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{context.data.length === 0 && (
					<h2 className='text-center text-3xl font-bold py-20 text-error'>
						No data
					</h2>
				)}
			</div>
		</section>
	)
}

export default AddEntry
