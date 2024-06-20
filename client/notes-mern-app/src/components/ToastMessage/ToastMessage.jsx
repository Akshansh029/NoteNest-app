/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose, isDarkMode }) => {
  useEffect(() => {
    if (isShown) {
      const timeOutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`fixed top-20 right-6 transition-opacity duration-300 ${
        isShown ? "opacity-100" : "opacity-0"
      } pointer-events-none`}
    >
      <div
        className={`min-w-52  border shadow-xl rounded-md after:w-[5px] after:h-full ${
          isDarkMode ? "bg-darkNav" : "bg-white"
        } ${
          type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p
            className={`text-xl font-medium ${
              isDarkMode ? "text-darkTextColor" : "text-slate-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
