/* eslint-disable react/prop-types */
import getInitials from "../../utils/getInitials";
const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-11 h-11 bg-slate-400 flex items-center justify-center  font-semibold rounded-full p-2">
        {getInitials(userInfo?.fullName)}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-semibold">{userInfo?.fullName}</p>
        <button
          className="text-sm underline font-normal text-slate-700"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
