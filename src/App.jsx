import AddEntry from './Components/AddEntry'
import Error from './Components/Error'
import Layout from './Components/Layout'
import RetrieveEntry from './Components/RetrieveEntry'
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
				element: <RetrieveEntry />,
			},
		],
		errorElement: <Error />,
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
