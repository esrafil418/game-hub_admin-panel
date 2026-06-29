import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export default function Add() {
	type ProductData = {
		name: string;
		description: string;
		price: string;
		category: string;
	};

	const URL = "http://localhost:4000";

	const [image, setImage] = useState<File | false>(false);
	const [data, setData] = useState<ProductData>({
		name: "",
		description: "",
		price: "",
		category: "",
	});

	const onChangeHandler = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("category", data.category);
		if (image) {
			formData.append("image", image);
		}
		const response = await axios.post(`${URL}/api/game/add`, formData);
		if (response.data.success) {
			setData({
				name: "",
				description: "",
				price: "",
				category: "",
			});
			setImage(false);
			toast.success(response.data.message);
		} else {
			toast.error(response.data.message);
		}
	};

	return (
		<div className="w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-6 md:ml-[max(5vw,25px)] mt-10 md:mt-12.5 text-gray-500 text-sm sm:text-base">
			<form onSubmit={onSubmitHandler} className="flex flex-col gap-4 md:gap-5">
				{/* Upload Image Section */}
				<div className="flex flex-col gap-2">
					<p className="font-medium text-[#262626]">Upload Image</p>
					<label htmlFor="image" className="cursor-pointer">
						<img
							src={
								image ? window.URL.createObjectURL(image) : assets.upload_area
							}
							alt="Upload area"
							className="w-30 h-auto hover:opacity-80 transition-opacity duration-200"
						/>
					</label>
					<input
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) setImage(file);
						}}
						type="file"
						id="image"
						accept="image/*"
						hidden
						required
					/>
				</div>

				{/* Product Name */}
				<div className="flex flex-col gap-2">
					<p className="font-medium text-[#262626]">Product Name</p>
					<input
						type="text"
						name="name"
						onChange={onChangeHandler}
						value={data.name}
						placeholder="Type here"
						className="w-full md:w-[max(40%,280px)] px-4 py-2.5 border border-[#c9c9c9] rounded-sm outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20 transition-all duration-200 text-[#262626]"
					/>
				</div>

				{/* Product Description */}
				<div className="flex flex-col gap-2">
					<p className="font-medium text-[#262626]">Product Description</p>
					<textarea
						name="description"
						onChange={onChangeHandler}
						value={data.description}
						rows={6}
						placeholder="Write content"
						required
						className="w-full md:w-[max(40%,280px)] px-4 py-2.5 border border-[#c9c9c9] rounded-sm outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20 transition-all duration-200 text-[#262626] resize-none"
					/>
				</div>

				{/* Category & Price Row */}
				<div className="flex flex-col sm:flex-row gap-4 md:gap-6">
					{/* Category */}
					<div className="flex flex-col gap-2 w-full sm:w-1/2">
						<p className="font-medium text-[#262626]">Product Category</p>
						<select
							name="category"
							onChange={onChangeHandler}
							className="w-full px-4 py-2.5 border border-[#c9c9c9] rounded-sm outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20 transition-all duration-200 text-[#262626] bg-white cursor-pointer"
						>
							<option value="Action">Action</option>
							<option value="Adventure">Adventure</option>
							<option value="Horror">Horror</option>
							<option value="Multiplayer">Multiplayer</option>
							<option value="Puzzle">Puzzle</option>
							<option value="Sports">Sports</option>
							<option value="Zombies">Zombies</option>
							<option value="Online">Online</option>
						</select>
					</div>

					{/* Price */}
					<div className="flex flex-col gap-2 w-full sm:w-1/2">
						<p className="font-medium text-[#262626]">Product Price</p>
						<input
							type="number"
							name="price"
							placeholder="$50"
							onChange={onChangeHandler}
							value={data.price}
							className="w-full px-4 py-2.5 border border-[#c9c9c9] rounded-sm outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/20 transition-all duration-200 text-[#262626]"
						/>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full sm:w-[max(15vw,150px)] mt-2 px-6 py-3 bg-turquoise text-white font-medium rounded-sm  hover:bg-teal-500 hover:shadow-lg transition-all duration-200 cursor-pointer"
				>
					Add Product
				</button>
			</form>
		</div>
	);
}
