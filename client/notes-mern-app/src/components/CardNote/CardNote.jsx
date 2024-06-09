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
    <div>
      <div className="">
        <div className="">
          <h5 className="text-base font-medium">{title}</h5>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin className="" onClick={onPinNote} />
      </div>
      <p className="text-sm text-slate-700">{content?.slice(0, 60)}...</p>
      <div>
        <div className="text-xs text-slate-400">{tags}</div>

        <div className="flex items-center gap-2">
          <MdEdit className="icon-btn hover:text-green-600" />
          <MdDelete className="icon-btn hover:text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default CardNote;
