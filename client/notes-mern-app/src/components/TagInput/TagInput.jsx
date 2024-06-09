/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded ring-2 ring-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="p-2 bg-slate-200 text-xs rounded text-slate-700 flex items-center font-semibold"
            >
              #{tag}
              <button
                className="ml-1 text-red-500"
                onClick={() => removeTag(tag)}
              >
                <IoClose className="text-slate-700" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
