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
const Navbar = () => {
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
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300 ">
              Home
            </Button>
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300">
              Timeline
            </Button>
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300">
              Account Settings
            </Button>
            <Button className="bg-gray-50 h-7 text-black hover:bg-amber-300">
              More Pages
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
