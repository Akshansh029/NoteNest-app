/* eslint-disable react/prop-types */
import { MdLogout } from "react-icons/md";
import getInitials from "../../utils/getInitials";

const ProfileInfo = ({ onLogout, userInfo, isDarkMode }) => {
  return (
    <div
      className={`flex items-center justify-evenly py-2 px-1 rounded-md ${
        isDarkMode ? "bg-[#313131]" : "bg-slate-200"
      }`}
    >
      <div className="flex justify-center items-center gap-2">
        <div
          className={`h-9 w-9 flex items-center justify-center rounded-[50%] ring-2  ${
            isDarkMode
              ? "ring-zinc-400 text-darkTextColor "
              : "ring-slate-400 bg-gray-300"
          }`}
        >
          {getInitials(userInfo?.fullName)}
        </div>
        <p
          className={`text-sm font-semibold ${
            isDarkMode ? "text-darkTextColor" : ""
          }`}
        >
          {userInfo?.fullName}
        </p>
      </div>
      <div className="relative group">
        <button
          className={`text-sm font-medium py-[5px] px-1 rounded-3xl transition-all ease-in group`}
          onClick={onLogout}
        >
          <MdLogout
            className={`text-lg text-red-500 ${
              isDarkMode ? "text-darkTextColor" : ""
            }`}
          />
        </button>
        <span className="tooltip group-hover:opacity-100">Logout</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
