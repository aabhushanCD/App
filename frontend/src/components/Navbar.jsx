import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Bell,
  Earth,
  House,
  Menu,
  MessageCircle,
  Image,
  Search,
} from "lucide-react";
import { useAuth } from "@/store/AuthStore";
import { toast } from "sonner";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success("Logout Successfully");
      return navigate("/login");
    }
  };
return (
  <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
    {/* Logo / Brand */}
    <div className="flex items-center gap-3">
      <Button
        className="bg-transparent text-blue-500 text-2xl font-bold hover:bg-transparent"
        onClick={() => navigate("/home")}
      >
        Hell'O
      </Button>
    </div>

    {/* Center Navigation */}
    <div className="hidden md:flex gap-6">
      <Button
        className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100"
        onClick={() => navigate("/home")}
      >
        Home
      </Button>
      <Button className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100">
        Timeline
      </Button>
      <Button className="bg-transparent text-gray-700 hover:text-blue-500 hover:bg-gray-100">
        Account
      </Button>
      <Button
        className="bg-transparent text-gray-700 hover:text-red-500 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>

    {/* Right Icons */}
    <div className="flex items-center gap-5">
      <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
      <House className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
      <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />

      {/* Extra actions */}
      <div className="flex items-center gap-6 ml-6">
        <Image className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
        <Menu className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  </div>
);
};

export default Navbar;
