import {Fragment} from "react";
import {Routes, Route} from "react-router-dom";
import {Footer} from "./components";
import {Login, Home, NotFound} from "./pages";

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home/:id/*' element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Footer />
		</Fragment>
	);
}

export default App;
