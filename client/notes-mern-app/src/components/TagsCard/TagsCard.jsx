/* eslint-disable react/prop-types */
import { FaTag } from "react-icons/fa6";

const TagsCard = ({ tagsHead, isDarkMode }) => {
  return (
    <div
      className={`flex items-center rounded-md py-2 px-3 cursor-pointer ${
        isDarkMode
          ? "bg-darkNav text-darkTextColor hover:bg-[#2C2C2C]"
          : "bg-slate-200 hover:bg-slate-300"
      }`}
    >
      <FaTag className="mr-2" />
      <h2 className="flex-grow text-center text-[15px]">{tagsHead}</h2>
    </div>
  );
};

export default TagsCard;
