import AddEntry from './Components/AddEntry'
import Layout from './Components/Layout'
import { DataProvider } from './Context'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <AddEntry />,
			},
			{
				path: '/retrieve',
				element: <h1>placeholder</h1>,
			},
		],
	},
])

const App = () => {
	return (
		<DataProvider>
			<RouterProvider router={router} />
		</DataProvider>
	)
}

export default App
