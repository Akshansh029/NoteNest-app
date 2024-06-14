/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Searchbar = ({
  value,
  onChange,
  handleSearch,
  onClearSearch,
  isDarkMode,
}) => {
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <div
      className={`flex items-center min-w-[180px] w-[320px] px-3 rounded-md gap-2 ${
        isDarkMode ? "bg-darkBg" : "bg-slate-200"
      }`}
    >
      <input
        type="text"
        placeholder="Search notes"
        className={`w-full bg-transparent text-sm font-normal py-[11px] outline-none ${
          isDarkMode
            ? "focus:placeholder:text-slate-100 text-slate-100"
            : "focus:placeholder:text-slate-700 placeholder:text-slate-500"
        }`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyEnter}
      />

      {value && (
        <IoMdClose
          size={18}
          className={`cursor-pointer ${
            isDarkMode ? "text-slate-100" : "text-slate-700"
          }`}
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
