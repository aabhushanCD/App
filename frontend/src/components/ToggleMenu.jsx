import { MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import React from "react";

const ToggleMenu = ({
  menuRef,
  setMenuOpen,
  isMenuOpen,
  handleDelete,
  id,
  setEditing,
}) => {
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
          isMenuOpen
            ? "bg-gray-100 text-gray-700"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        {isMenuOpen ? <X size={15} /> : <MoreHorizontal size={17} />}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-10 z-50 w-44 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5">
          <button
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
            onClick={() => {
              setMenuOpen(false);
              setEditing(id);
            }}
          >
            <Pencil size={13} className="text-gray-400" />
            Edit post
          </button>
          <div className="h-px bg-gray-100 my-1" />
          <button
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left"
            onClick={() => {
              setMenuOpen(false);

              handleDelete(id);
            }}
          >
            <Trash2 size={13} className="text-red-400" />
            Delete post
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleMenu;
