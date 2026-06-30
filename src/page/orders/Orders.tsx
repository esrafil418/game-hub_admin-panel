import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

type OrderItem = {
	name: string;
	quantity: number;
};

type Address = {
	firstName: string;
	lastName: string;
	street: string;
	city: string;
	state: string;
	country: string;
	zipcode: string;
	phone: string;
};

type Order = {
	items: OrderItem[];
	address: Address;
	amount: number;
	status: string;
	_id: string;
};

export default function Orders({ URL }: { URL: string }) {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchAllOrders = async () => {
		setLoading(true);
		try {
			const response = await axios.get(URL + "/api/orders/list");
			if (response.data.success) {
				setOrders(response.data.data);
			} else {
				toast.error("Error fetching orders");
			}
		} catch (error) {
			toast.error("Error fetching orders");
		} finally {
			setLoading(false);
		}
	};

	const updateOrderStatus = async (orderId: string, newStatus: string) => {
		try {
			const response = await axios.post(URL + "/api/orders/status", {
				orderId,
				status: newStatus,
			});
			if (response.data.success) {
				toast.success("Order status updated");
				fetchAllOrders(); // Refresh orders
			} else {
				toast.error("Error updating status");
			}
		} catch (error) {
			toast.error("Error updating status");
		}
	};

	useEffect(() => {
		fetchAllOrders();
	}, []);

	if (loading) {
		return (
			<div className="min-h-[60vh] grid place-items-center">
				<div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
				<img
					src={assets.parcel_icon}
					alt="No orders"
					className="w-20 h-20 opacity-50"
				/>
				<p className="text-[#808080] text-lg font-medium">No orders yet</p>
				<p className="text-[#a9a9a9] text-sm">Orders will appear here</p>
			</div>
		);
	}

	return (
		<div className="w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-6 md:ml-[max(5vw,25px)] mt-10 md:mt-12.5">
			<h2 className="text-[#262626] text-2xl font-semibold mb-6">All Orders</h2>

			<div className="flex flex-col gap-4">
				{orders.map((order) => (
					<div
						key={order._id}
						className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white"
					>
						{/* Parcel Icon */}
						<img
							src={assets.parcel_icon}
							alt="parcel"
							className="w-14 h-14 object-contain self-center md:self-start"
						/>

						{/* Order Details */}
						<div className="flex flex-col gap-1">
							{/* Items */}
							<p className="text-[#262626] text-sm sm:text-base font-medium">
								{order.items.map((item, idx) => (
									<span key={idx}>
										{item.name} x {item.quantity}
										{idx < order.items.length - 1 && ", "}
									</span>
								))}
							</p>

							{/* Customer Name */}
							<p className="text-[#49557e] font-semibold">
								{order.address.firstName} {order.address.lastName}
							</p>

							{/* Address */}
							<div className="text-[#676767] text-sm">
								<p>{order.address.street}</p>
								<p>
									{order.address.city}, {order.address.state},{" "}
									{order.address.country} - {order.address.zipcode}
								</p>
								<p className="mt-1">📞 {order.address.phone}</p>
							</div>
						</div>

						{/* Items Count */}
						<div className="flex flex-col items-center justify-center">
							<span className="text-[#262626] font-medium text-lg">
								{order.items.length}
							</span>
							<span className="text-[#a9a9a9] text-xs">Items</span>
						</div>

						{/* Amount */}
						<div className="flex flex-col items-center justify-center">
							<span className="text-tomato font-bold text-xl">
								${order.amount}.00
							</span>
						</div>

						{/* Status Dropdown */}
						<div className="flex flex-col gap-2 justify-center">
							<select
								value={order.status}
								onChange={(e) => updateOrderStatus(order._id, e.target.value)}
								className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white cursor-pointer hover:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-colors duration-200"
							>
								<option value="Game Processing">⏳ Game Processing</option>
								<option value="Out for Delivery">🚚 Out for Delivery</option>
								<option value="Delivered">✅ Delivered</option>
							</select>

							{/* Status Badge */}
							<span className="text-xs text-[#808080] text-center">
								Status:{" "}
								<span className="font-medium text-[#262626]">
									{order.status}
								</span>
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
