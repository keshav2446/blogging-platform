import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    dispatch(login({ name: "Keshav Singh", email: "keshav@example.com" }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {/* Dummy Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Login as Demo User
        </button>
      </div>
    </div>
  );
}
