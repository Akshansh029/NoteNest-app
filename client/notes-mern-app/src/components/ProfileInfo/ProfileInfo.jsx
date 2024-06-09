/* eslint-disable react/prop-types */
import getInitials from "../../utils/getInitials";
const ProfileInfo = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-11 h-11 bg-slate-400 flex items-center justify-center  font-semibold rounded-full p-2">
        {getInitials("Akshansh Singh")}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-semibold">Akshansh</p>
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
