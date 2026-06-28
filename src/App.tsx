import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./page/add/Add";
import List from "./page/list/List";
import Orders from "./page/orders/Orders";

export default function App() {
	return (
		<div>
			<Navbar />
			<hr />
			<div className="flex">
				<Sidebar />
				<Routes>
					<Route path="/add" element={<Add />} />
					<Route path="/list" element={<List />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</div>
		</div>
	);
}
