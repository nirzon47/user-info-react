import AddEntry from './Components/AddEntry'
import Header from './Components/Header'
import { DataProvider } from './Context'

const App = () => {
	return (
		<DataProvider>
			<div className='min-h-screen w-screen'>
				<Header />
				<AddEntry />
			</div>
		</DataProvider>
	)
}

export default App
