/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const CardNote = ({
  title,
  date,
  isPinned,
  onEdit,
  deleteNote,
  onPinNote,
  isDarkMode,
  closeModal,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-md p-3 transition-all ease-in-out flex flex-col gap-4  ${
        isDarkMode
          ? "bg-darkNav hover:bg-[#2C2C2C] border-2 border-darkBg"
          : "bg-slate-100 border-2 hover:bg-slate-200"
      } `}
      onClick={onEdit}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-base font-medium  ${
              isDarkMode ? "text-darkTextColor" : ""
            }`}
          >
            {title}
          </h3>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-400"
          } hover:text-primary ${
            isDarkMode ? "text-darkTextColor" : "text-slate-400"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <span
          className={`text-xs ${
            isDarkMode ? "text-darkTextColor" : " text-slate-500"
          }`}
        >
          {moment(date).format("h:mm a, Do MMM YYYY")}
        </span>
        <MdDelete
          className={`icon-btn hover:text-red-600 ${
            isDarkMode ? "text-darkTextColor" : "text-slate-400"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            deleteNote();
            closeModal();
          }}
        />
      </div>
    </div>
  );
};

export default CardNote;
