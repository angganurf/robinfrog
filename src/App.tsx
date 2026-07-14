import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GifMeTune from "./pages/GifMeTune";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="gifmetune" element={<GifMeTune />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
