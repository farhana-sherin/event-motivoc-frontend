import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosinstance";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../component/AuthHook";

export default function Login() {


  const {login} = useContext(AuthContext)

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axiosInstance.post("customer/login/", data);

      console.log(response.data.data.access);
      let token = response.data.data.access;
      let role = response.data.data.role;
      console.log(role);
      
      login(token)
      if (role === 'organizer') {

        navigate("/auth/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center cyber-bg px-4 py-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md cyber-glass rounded-2xl p-8 animate-fade-in-up border border-[#7B3EFF]/30"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-[#7B3EFF] to-[#A259FF] flex items-center justify-center mb-4 shadow-lg cyber-glow">
            <span className="text-[#FFFFFF] font-bold text-2xl">E</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Welcome to <span className="cyber-accent">EventAI</span>
          </h2>
          <p className="text-[#CFCBD3] mt-2">Sign in to your account</p>
        </div>

        <div className="mb-5">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Email Address</label>
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

        <div className="mb-6">
          <label className="block text-[#CFCBD3] font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
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
          Sign In
        </button>

        {/* Register Link */}
        <p className="text-center text-[#CFCBD3] mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#A259FF] hover:text-[#C3A6FF] font-semibold transition"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}