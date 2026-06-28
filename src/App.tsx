import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
	return (
		<div>
			<Navbar />
			<hr />
			<div className="flex">
				<Sidebar />
			</div>
		</div>
	);
}
