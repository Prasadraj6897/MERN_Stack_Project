import React from 'react'
import Routers from './Routers/Routers'
import {Provider} from "react-redux"
import {store} from "./Store/Store"

const App = () => {
	return(
		<>
			<Provider store = {store}>
				<Routers />
			</Provider>

		</>
	)
}

export default App;
