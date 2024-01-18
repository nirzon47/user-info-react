import PageHeading from './PageHeading'
import { DataContext } from '../Context'
import { useContext, useState } from 'react'
import { nanoid } from 'nanoid'

const AddEntry = () => {
	const context = useContext(DataContext)

	const [showInput, setShowInput] = useState(false)
	const [name, setName] = useState('')
	const [dob, setDob] = useState('')
	const [adhaar, setAdhaar] = useState('')
	const [phone, setPhone] = useState('')
	const [inputError, setInputError] = useState(false)

	const handleAdhaarChange = (event) => {
		if (event.target.value.length > 12) {
			event.target.value = event.target.value.slice(0, 12)
		}

		if (event.target.value.length < 12) {
			setInputError(true)
		}

		setAdhaar(event.target.value)
	}

	const handlePhoneChange = (event) => {
		if (event.target.value.length > 10) {
			event.target.value = event.target.value.slice(0, 10)
		}

		if (event.target.value.length < 10) {
			setInputError(true)
		}

		setPhone(event.target.value)
	}

	const toggleInput = () => {
		setShowInput(!showInput)
	}

	const getAge = (dob) => {
		const today = new Date()
		const birthDate = new Date(dob)
		let age = today.getFullYear() - birthDate.getFullYear()
		const month = today.getMonth() - birthDate.getMonth()

		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}

		return age
	}

	const addData = () => {
		const age = getAge()

		if (!name || !dob || !adhaar || !phone) {
			alert('Please fill all the fields')

			return
		}

		if (inputError) {
			alert(
				'Adhaar Number must be 12 digits long and Phone Number must be 10 digits long'
			)

			return
		}

		context.updateData({
			id: nanoid(),
			name,
			dob,
			adhaar,
			phone,
			age,
		})

		setName('')
		setDob('')
		setAdhaar('')
		setPhone('')
		setShowInput(false)
		setInputError(false)
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
										type='text'
										className='input input-bordered input-sm'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</td>
								<td>
									<input
										type='date'
										className='input input-bordered input-sm'
										value={dob}
										onChange={(e) => setDob(e.target.value)}
									/>
								</td>
								<td>
									<input
										type='number'
										inputMode='numeric'
										className='input input-bordered input-sm w-11/12 pr-0'
										value={adhaar}
										onChange={handleAdhaarChange}
									/>
								</td>
								<td>
									<input
										type='number'
										inputMode='numeric'
										className='input input-bordered input-sm w-11/12 pr-0'
										min={1000000000}
										max={9999999999}
										value={phone}
										onChange={handlePhoneChange}
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
