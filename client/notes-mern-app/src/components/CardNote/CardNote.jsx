/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";

const CardNote = ({
  title,
  date,
  tags,
  content,
  isPinned,
  deleteNote,
  onPinNote,
}) => {
  return (
    <div className="border-2 rounded p-4 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-base font-medium">{title}</h5>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm mt-2 text-slate-600">{content?.slice(0, 60)}...</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-400">{tags}</div>

        <div className="flex items-center gap-2">
          <MdEdit className="icon-btn hover:text-green-600" />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={deleteNote}
          />
        </div>
      </div>
    </div>
  );
};

export default CardNote;
