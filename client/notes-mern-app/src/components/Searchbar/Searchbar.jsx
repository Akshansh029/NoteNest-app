/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="flex items-center w-80 bg-slate-100 px-3 rounded-md gap-2">
      <input
        type="text"
        placeholder="Search notes"
        className="w-full bg-transparent text-sm font-normal py-[11px] outline-none focus:placeholder:text-slate-600 "
        value={value}
        onChange={onChange}
        onKeyDown={onKeyEnter}
      />

      {value && (
        <IoMdClose
          size={18}
          className="cursor-pointer"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-slate-700"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
