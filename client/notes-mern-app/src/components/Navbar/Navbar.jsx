/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const Navbar = ({
  userInfo,
  onSearchNote,
  handleClearSearch,
  isDarkMode,
  setIsDarkMode,
  AddNote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div
      className={`flex justify-between items-center py-2 px-6 drop-shadow max-[768px]:px-3 max-h-64 ${
        isDarkMode ? "bg-darkNav" : "bg-white border-gray-700 border-b-[1px]"
      }`}
    >
      <h2
        className={`text-2xl py-2 font-semibold max-[768px]:text-xl ${
          isDarkMode ? "text-slate-50" : "text-black"
        }`}
      >
        NoteNest
      </h2>

      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={clearSearch}
        isDarkMode={isDarkMode}
      />

      <div className="flex items-center gap-4">
        <button
          className={`transition-all ease-in rounded-[35px] w-[8.3rem] h-10 font-medium flex items-center justify-center gap-2 hover:ring-2 hover:bg-transparent hover:ring-primary bg-primary group`}
          onClick={AddNote}
        >
          <div className="flex gap-2">
            <FaPlus className="text-white text-[18px] group-hover:text-primary" />
            <h4 className="text-sm font-medium text-white max-[768px]:display-none group-hover:text-primary">
              Create New
            </h4>
          </div>
        </button>
        <button
          className={`p-3 rounded-full hover:drop-shadow-sm ${
            isDarkMode
              ? "bg-darkBg hover:bg-[#101A3F]"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? (
            <IoSunny className="text-zinc-200 text-[20px]" />
          ) : (
            <IoMoon className="text-black text-[20px]" />
          )}
        </button>
        <ProfileInfo
          isDarkMode={isDarkMode}
          onLogout={() => {
            navigate("/login");
          }}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
};

export default Navbar;
