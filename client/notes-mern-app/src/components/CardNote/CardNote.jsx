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
}) => {
  return (
    <div
      className={`cursor-pointer rounded-md p-3 hover:shadow-custom transition-all ease-in-out flex flex-col gap-4  ${
        isDarkMode
          ? "bg-darkNav border-zinc-600 hover:shadow-slate-400"
          : "bg-slate-50 border-2"
      } `}
      onClick={onEdit}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-base font-semibold  ${
              isDarkMode ? "text-slate-200" : ""
            }`}
          >
            {title}
          </h3>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-400"
          } hover:text-primary ${
            isDarkMode ? "text-slate-200" : "text-slate-400"
          }`}
          onClick={onPinNote}
        />
      </div>
      <div className="flex items-center gap-2 justify-between">
        <span
          className={`text-xs ${
            isDarkMode ? "text-slate-400" : " text-slate-500"
          }`}
        >
          {moment(date).format("Do MMM YYYY")}
        </span>
        <MdDelete
          className={`icon-btn hover:text-red-600 ${
            isDarkMode ? "text-slate-200" : "text-slate-400"
          }`}
          onClick={deleteNote}
        />
      </div>
    </div>
  );
};

export default CardNote;
