import { assets } from "../../assets/assets";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center px-4 md:px-[4%] py-2">
			<div className="flex items-center gap-2 font-semibold text-[#262626] text-lg">
				<span className="w-2 h-2 bg-green-500 rounded-full"></span>
				Admin Panel
			</div>
			<img src={assets.profile} alt="Profile" className="w-8 object-cover" />
		</div>
	);
}
