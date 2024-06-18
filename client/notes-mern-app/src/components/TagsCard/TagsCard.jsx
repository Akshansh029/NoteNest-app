import { FaTag } from "react-icons/fa6";

const TagsCard = () => {
  return (
    <div className="bg-slate-200 hover:bg-slate-300 flex items-center rounded-md py-2 px-3 cursor-pointer">
      <FaTag className="mr-2" />
      <h2 className="flex-grow text-center text-[15px]">Studies</h2>
    </div>
  );
};

export default TagsCard;
