import { useState } from 'react'
import { createContext } from 'react'

const DataContext = createContext()

const DataProvider = (prop) => {
	const children = prop.children
	const [data, setData] = useState(
		JSON.parse(localStorage.getItem('userData')) || []
	)

	const updateData = (newData) => {
		const newDataArray = [...data]
		newDataArray.push(newData)

		localStorage.setItem('userData', JSON.stringify(newDataArray))
		setData(newDataArray)
	}

	console.log(data)

	return (
		<DataContext.Provider value={{ data, updateData }}>
			{children}
		</DataContext.Provider>
	)
}

export { DataProvider, DataContext }
