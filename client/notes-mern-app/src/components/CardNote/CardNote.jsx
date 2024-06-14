/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";

const CardNote = ({
  title,
  date,
  tags,
  content,
  isPinned,
  onEdit,
  deleteNote,
  onPinNote,
  isDarkMode,
}) => {
  return (
    <div
      className={`rounded-md p-4 hover:shadow-custom transition-all ease-in-out flex flex-col gap-2  ${
        isDarkMode
          ? "bg-darkNav border-zinc-600 hover:shadow-slate-400"
          : "bg-slate-50 border-2"
      } `}
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
          <span
            className={`text-xs ${
              isDarkMode ? "text-slate-400" : " text-slate-500"
            }`}
          >
            {moment(date).format("Do MMM YYYY")}
          </span>
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
      <div
        className={`text-sm mt-2 ${
          isDarkMode ? "text-slate-300" : "text-slate-600"
        }`}
        dangerouslySetInnerHTML={{ __html: content?.slice(0, 60) }}
      ></div>
      <div className="flex items-center justify-between flex-wrap gap-4 mt-auto">
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={` text-xs font-medium py-2 px-3 rounded-[4px] ${
                isDarkMode
                  ? "bg-darkBg text-slate-200"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {`#${tag}`}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdEdit
            className={`icon-btn hover:text-green-600 ${
              isDarkMode ? "text-slate-200" : "text-slate-400"
            }`}
            onClick={onEdit}
          />
          <MdDelete
            className={`icon-btn hover:text-red-600 ${
              isDarkMode ? "text-slate-200" : "text-slate-400"
            }`}
            onClick={deleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default CardNote;
