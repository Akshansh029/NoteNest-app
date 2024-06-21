/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../../components/TagInput/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../index.css";
import { IoClose } from "react-icons/io5";

const AddEditNotes = ({
  type,
  noteData,
  getAllNotes,
  getAllTags,
  getPinnedNotes,
  closeModal,
  showToastMessage,
  isDarkMode,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  // Add notes API integration
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        console.log("Note added successfully:", response.data.note);
        showToastMessage("Note added successfully", "add");
        getAllNotes();
        getAllTags();
        getPinnedNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  // Edit note integration
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        console.log("Note updated successfully:", response.data.note);
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
        getAllTags();
        getPinnedNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error updating note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
      document.location.reload();
    }
  };

  return (
    <div className="min-h-[100%] relative flex flex-col justify-between">
      <button
        className={`h-5 w-5 absolute right-2 top-2 flex items-center justify-center rounded-full ${
          isDarkMode ? "bg-darkBg text-white" : " bg-slate-300"
        }`}
        onClick={closeModal}
      >
        <IoClose className={`text-lg`} />
      </button>
      <div className="flex flex-col gap-2">
        <label
          className={`input-label ${
            isDarkMode ? "text-gray-400" : "text slate-800"
          }`}
        >
          TITLE
        </label>
        <input
          type="text"
          className={`text-2xl outline-none font-medium ${
            isDarkMode ? "text-darkTextColor bg-transparent" : "text-slate-800"
          }`}
          placeholder="Go for a walk at 6"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label
          className={`input-label ${
            isDarkMode ? "text-gray-400" : "text slate-800"
          }`}
        >
          CONTENT
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          onChange={setContent}
          className={`min-h-64 max-h-64 overflow-y-auto hide-scrollbar text-base ${
            isDarkMode
              ? "text-darkTextColor react-quill-toolbar-dark"
              : "text-black"
          }`}
        />
      </div>
      <div className="mt-auto flex flex-col justi">
        <div className="flex flex-col gap-2">
          <label
            className={`input-label ${
              isDarkMode ? "text-gray-400" : "text slate-800"
            }`}
          >
            TAGS
          </label>
          <TagInput tags={tags} setTags={setTags} isDarkMode={isDarkMode} />
        </div>
        {error && (
          <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
        )}
      </div>
      <button
        className={`btn-primary mt-6 ${
          isDarkMode ? "bg-primaryDark" : "bg-primary"
        }`}
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
