import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
	const navigate = useNavigate();
	const { login, loading } = useUserStore();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// Handle input change
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(formData.email, formData.password);
			toast.success("Login successful!");
			navigate("/faq"); // Redirect to home after login
		} catch (error) {
			toast.error("Invalid credentials");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-black">
			<div className="w-full max-w-md bg-green-300 p-8 shadow-lg rounded-lg">
				<h2 className="text-2xl text-blue-400 font-semibold text-center mb-6">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Input */}
					<div>
						<label className="block text-sm font-medium">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-sm font-medium">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				{/* Signup Link */}
				<p className="text-center text-sm mt-4">
					Don't have an account?{" "}
					<Link to="/singup" className="text-blue-600 hover:underline">
						Sing-up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
