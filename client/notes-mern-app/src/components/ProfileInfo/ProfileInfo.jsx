/* eslint-disable react/prop-types */
// import getInitials from "../../utils/getInitials";
const ProfileInfo = ({ onLogout, userInfo, isDarkMode }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-semibold">{userInfo?.fullName}</p>
        <button
          className={`text-sm font-medium py-[5px] px-3 rounded-3xl transition-all ease-in hover:ring-2 hover:bg-transparent hover:ring-red-500 bg-red-500 text-white hover:text-red-500`}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
