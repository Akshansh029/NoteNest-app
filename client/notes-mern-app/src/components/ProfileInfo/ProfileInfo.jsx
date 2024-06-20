/* eslint-disable react/prop-types */
import { MdLogout } from "react-icons/md";
import getInitials from "../../utils/getInitials";

const ProfileInfo = ({ onLogout, userInfo, isDarkMode }) => {
  return (
    <div className="flex items-center justify-evenly bg-slate-200 py-2 px-1 rounded-md">
      <div className="flex justify-center items-center gap-2">
        <div className="h-9 w-9 flex items-center justify-center rounded-[50%] ring-2 ring-slate-400">
          {getInitials(userInfo?.fullName)}
        </div>
        <p className="text-sm font-semibold">{userInfo?.fullName}</p>
      </div>
      <button
        className={`text-sm font-medium py-[5px] px-3 rounded-3xl transition-all ease-in group`}
        onClick={onLogout}
      >
        <MdLogout className={`text-lg group-hover:text-red-500`} />
      </button>
    </div>
  );
};

export default ProfileInfo;
