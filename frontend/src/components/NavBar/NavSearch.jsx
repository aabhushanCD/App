// components/navbar/NavSearch.jsx
import { useState, useEffect, memo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { searchUsers } from "@/features/search/search.service"; // service layer
import SearchUser from "../../features/search/SearchUser";

const NavSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search submit
  const handleSearch = async () => {
    if (!searchText.trim()) return;

    try {
      const res = await searchUsers(searchText); // service call
      setSearchResult(
        Array.isArray(res.data) ? res.data : res.data.users || [],
      );
      setOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Search!");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".nav-search-container")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative nav-search-container flex items-center border rounded-2xl p-1 w-64">
      <Input
        placeholder="Search..."
        className="text-xs font-semibold border-none "
        value={searchText}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <Search
        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-500"
        onClick={handleSearch}
      />

      {open && searchResult.length > 0 && (
        <div className="absolute top-full left-0 p-2 bg-white shadow-lg border rounded-md mt-1 z-50 w-full max-h-64 overflow-y-auto">
          {searchResult.map((user) => (
            <SearchUser key={user._id} data={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(NavSearch);
