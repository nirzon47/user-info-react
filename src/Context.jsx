import { useState, createContext, useContext } from 'react'

const DataContext = createContext()
export const useDataContext = () => {
	return useContext(DataContext)
}

/**
 * Creates a data provider component that manages data and provides it to its children.
 *
 * @param {object} prop - The prop object containing the children component.
 * @return {JSX.Element} The data provider component.
 */
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

	const removeData = (id) => {
		const newDataArray = [...data]
		const index = newDataArray.findIndex((item) => item.id === id)
		newDataArray.splice(index, 1)

		localStorage.setItem('userData', JSON.stringify(newDataArray))
		setData(newDataArray)
	}

	return (
		<DataContext.Provider value={{ data, updateData, removeData }}>
			{children}
		</DataContext.Provider>
	)
}

export { DataProvider, DataContext }
