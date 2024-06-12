/* eslint-disable react/prop-types */
import { useState } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
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
    <div className="flex justify-between items-center py-2 px-6 bg-white drop-shadow">
      <h2 className="text-2xl text-black py-2 font-semibold">NoteNest</h2>

      <Searchbar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={clearSearch}
      />

      <ProfileInfo
        onLogout={() => {
          navigate("/login");
        }}
        userInfo={userInfo}
      />
    </div>
  );
};

export default Navbar;
