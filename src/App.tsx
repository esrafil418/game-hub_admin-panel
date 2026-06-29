import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./page/add/Add";
import List from "./page/list/List";
import Orders from "./page/orders/Orders";
import { ToastContainer } from "react-toastify";

export default function App() {
	return (
		<div>
			<ToastContainer />
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
