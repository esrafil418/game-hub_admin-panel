import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Product = {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	__v?: number;
};

type ApiResponse = {
	success: boolean;
	data: Product[];
};

export default function List() {
	const URL = "http://localhost:4000";

	const [list, setList] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const fetchList = async () => {
		try {
			setLoading(true);
			const response = await axios.get<ApiResponse>(`${URL}/api/game/list`);
			if (response.data.success) {
				setList(response.data.data);
			} else {
				toast.error("Failed to fetch games");
			}
		} catch (error) {
			console.error("Error fetching list:", error);
			toast.error("Error loading games");
		} finally {
			setLoading(false);
		}
	};

	const removeGame = async (_id: string) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this game? This action cannot be undone.",
		);
		if (!confirmDelete) {
			return;
		}

		setDeletingId(_id);

		try {
			const response = await axios.post(`${URL}/api/game/remove`, { _id });

			if (response.data.success) {
				toast.success("Game deleted successfully!");

				setList((prevList) => prevList.filter((item) => item._id !== _id));
			} else {
				toast.error(response.data.message || "Failed to delete game");
			}
		} catch (error) {
			console.error("Error deleting:", error);
			toast.error("Error deleting game. Please try again.");
		} finally {
			setDeletingId(null);
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	if (loading && list.length === 0) {
		return (
			<div className="w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-6 md:ml-[max(5vw,25px)] mt-10 md:mt-12.5">
				<div className="text-center py-10">
					<div className="inline-block w-8 h-8 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
					<p className="text-[#808080] text-sm mt-3">Loading games...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-6 md:ml-[max(5vw,25px)] mt-10 md:mt-12.5">
			<div className="flex justify-between items-center mb-4">
				<p className="text-[#262626] text-xl font-semibold">All Games List</p>
				<span className="text-sm text-[#808080]">
					{list.length} {list.length === 1 ? "game" : "games"}
				</span>
			</div>

			<div className="overflow-x-auto">
				{/* Header Row */}
				<div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_0.5fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 px-3 sm:px-4 py-3 bg-[#f9f9f9] border border-gray-200 rounded-t-sm text-[13px] sm:text-sm font-medium text-[#262626] min-w-125">
					<p>Image</p>
					<p>Name</p>
					<p>Category</p>
					<p>Price</p>
					<p className="text-center">Action</p>
				</div>

				{/* List Items */}
				{list.length > 0 ? (
					list.map((item) => {
						const imageUrl = `${URL}/images/${item.image}`;

						return (
							<div
								key={item._id}
								className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_0.5fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 px-3 sm:px-4 py-3 border-x border-b border-gray-200 text-[13px] sm:text-sm hover:bg-gray-50 transition-colors duration-200 min-w-125"
							>
								{/* Image */}
								<img
									src={imageUrl}
									alt={item.name}
									className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-sm border border-gray-100"
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"/placeholder-image.png";
									}}
								/>

								{/* Name */}
								<p
									className="text-[#262626] font-medium truncate pr-2"
									title={item.name}
								>
									{item.name}
								</p>

								{/* Category */}
								<p className="text-[#676767]">
									<span className="px-2 py-1 bg-[#f9f9f9] rounded-full text-xs">
										{item.category}
									</span>
								</p>

								{/* Price */}
								<p className="text-tomato font-semibold">
									${item.price.toFixed(2)}
								</p>

								{/* Action - Delete button with loading state */}
								<button
									type="button"
									className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 mx-auto cursor-pointer ${
										deletingId === item._id
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "hover:bg-red-50 hover:text-red-500 text-gray-400 hover:scale-110"
									}`}
									onClick={() => removeGame(item._id)}
									disabled={deletingId === item._id}
									aria-label="Delete item"
								>
									{deletingId === item._id ? (
										// Show loading spinner while deleting
										<div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
									) : (
										// Show X icon
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									)}
								</button>
							</div>
						);
					})
				) : (
					// Empty state
					<div className="text-center py-10 border border-gray-200 border-t-0 rounded-b-sm">
						<svg
							className="w-12 h-12 mx-auto text-gray-300 mb-3"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
							/>
						</svg>
						<p className="text-[#808080] text-sm">No games found</p>
						<p className="text-[#a9a9a9] text-xs mt-1">Add your first game</p>
					</div>
				)}
			</div>
		</div>
	);
}
