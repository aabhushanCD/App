// components/navbar/NavSearch.jsx
import { useState, useEffect, memo, useRef } from "react";

import { Search, X } from "lucide-react";

import { searchUsers } from "@/features/search/search.service"; // service layer
import SearchUser from "../../features/search/SearchUser";

const NavSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  // Handle input change
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (!e.target.value.trim()) {
      setOpen(false);
      setSearchResult([]);
    }
  };

  // Handle search submit
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setLoading(true);

    const res = await searchUsers(searchText); // service call
    setSearchResult(Array.isArray(res.data) ? res.data : res.data.users || []);
    setOpen(true);
    setLoading(false);
  };
  const handleClear = () => {
    setSearchText("");
    setOpen(false);
    setSearchResult([]);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const fn = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div className="relative w-[350px]" ref={containerRef}>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full border focus-within:ring-2 focus-within:ring-blue-400 transition">
        <Search className="w-4 h-4 text-gray-500" onClick={handleSearch} />

        <input
          ref={inputRef}
          placeholder="Search people..."
          className="bg-transparent outline-none text-sm w-full"
          value={searchText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSearch();
            }
          }}
        />

        {searchText && !loading && (
          <X
            className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-500"
            onClick={handleClear}
          />
        )}

        {loading && (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
      {open && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-xl border rounded-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
          {searchResult.length > 0 ? (
            searchResult.map((user) => (
              <SearchUser key={user._id} data={user} setOpen={setOpen} />
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(NavSearch);
