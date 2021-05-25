import React from 'react'
import Routers from './Routers/Routers'
import {Provider} from "react-redux"
import {store} from "./Store/Store"
import './App.css'
const App = () => {
	return(
		<div className="App">
			<Provider store = {store}>
				<Routers />
			</Provider>

		</div>
	)
}

export default App;
