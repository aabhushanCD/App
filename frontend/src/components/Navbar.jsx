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
    <>
      <div className="flex bg-gray-100 justify-around flex-wrap h-15">
        <div className="flex gap-10">
          <div>
            <Button className="bg-transparent text-blue text-blue-400 text-5xl mt-1">
              Hell'O
            </Button>
          </div>
          <div className="flex gap-10 items-center  md:gap-1 sm:gap-3">
            <Button
              className="bg-gray-50 h-7 text-black hover:bg-amber-300 "
              onClick={() => navigate("/home")}
            >
              Home
            </Button>
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300">
              Timeline
            </Button>
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300">
              Account Settings
            </Button>
            <Button
              className="bg-gray-50 h-7 text-black hover:bg-amber-300"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="flex gap-7 items-center">
          <Search />
          <House />
          <Bell />
          <MessageCircle />
          <Earth />
          <div className="flex gap-8 items-center ml-10">
            <Image />
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
