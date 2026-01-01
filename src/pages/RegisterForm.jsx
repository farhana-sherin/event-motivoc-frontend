import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosinstance";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../component/AuthHook";

export default function Register() {
  let navigate = useNavigate();

  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axiosInstance.post("customer/register/", data);

      console.log(response.data.data.access);
      let token = response.data.data.access;
      // Use the login function from context to update global state and storage
      login(token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center cyber-bg px-4 py-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md cyber-glass rounded-2xl p-8 animate-fade-in-up border border-[#7B3EFF]/30"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-[#7B3EFF] to-[#A259FF] flex items-center justify-center mb-4 shadow-lg cyber-glow">
            <span className="text-[#FFFFFF] font-bold text-2xl">M</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Create <span className="cyber-accent">Account</span>
          </h2>
          <p className="text-[#CFCBD3] mt-2">Join our event community today</p>
        </div>

        <div className="mb-4">
          <label className="block text-[#CFCBD3] font-semibold mb-2">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            {...register("first_name", { required: "First name is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.first_name ? "border-red-500" : ""}`}
          />
          {errors.first_name && (
            <p className="text-red-400 text-sm mt-1">{errors.first_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            {...register("last_name", { required: "Last name is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.last_name ? "border-red-500" : ""}`}
          />
          {errors.last_name && (
            <p className="text-red-400 text-sm mt-1">{errors.last_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.username ? "border-red-500" : ""}`}
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            {...register("phone", { required: "Phone is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            {...register("password", { required: "Password is required" })}
            className={`w-full bg-[#100024]/50 border border-[#7B3EFF]/30 rounded-xl px-4 py-3 text-[#CFCBD3] focus:outline-none focus:ring-2 focus:ring-[#A259FF]/50 focus:border-[#A259FF] transition ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cyber-button py-3 rounded-xl font-bold hover:shadow-xl transition cyber-glow-hover"
        >
          Create Account
        </button>

        {/* Login Link Box */}
        <div className="mt-8 pt-6 border-t border-[#7B3EFF]/20 text-center">
          <p className="text-[#CFCBD3] mb-3 text-sm">Already have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="block w-full py-3 rounded-xl border border-[#7B3EFF]/50 hover:bg-[#7B3EFF]/10 text-[#A259FF] font-bold transition-all duration-300 hover:scale-[1.02]"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
