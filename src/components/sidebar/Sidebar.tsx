import { CircleCheckBig, CirclePlus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="w-[18%] min-h-screen border border-[#a9a9a9] border-t-0">
			<div className="pt-10 md:pt-12.5 pl-4 md:pl-[20%] flex flex-col gap-5">
				<NavLink
					to="/add"
					className={({ isActive }) =>
						`flex items-center gap-3 border border-[#a9a9a9] border-r-0 px-2.5 py-2 rounded-l cursor-pointer transition-colors duration-200 ${
							isActive ? "bg-[#fff0ed] border-turquoise" : "hover:bg-gray-50"
						}`
					}
				>
					<CirclePlus />
					<p className="hidden sm:block">Add Items</p>
				</NavLink>

				<NavLink
					to="/list"
					className={({ isActive }) =>
						`flex items-center gap-3 border border-[#a9a9a9] border-r-0 px-2.5 py-2 rounded-l cursor-pointer transition-colors duration-200 ${
							isActive ? "bg-[#fff0ed] border-turquoise" : "hover:bg-gray-50"
						}`
					}
				>
					<CircleCheckBig />
					<p className="hidden sm:block">List Items</p>
				</NavLink>

				<NavLink
					to="/orders"
					className={({ isActive }) =>
						`flex items-center gap-3 border border-[#a9a9a9] border-r-0 px-2.5 py-2 rounded-l cursor-pointer transition-colors duration-200 ${
							isActive ? "bg-[#fff0ed] border-turquoise" : "hover:bg-gray-50"
						}`
					}
				>
					<CircleCheckBig />
					<p className="hidden sm:block">Orders</p>
				</NavLink>
			</div>
		</div>
	);
}
