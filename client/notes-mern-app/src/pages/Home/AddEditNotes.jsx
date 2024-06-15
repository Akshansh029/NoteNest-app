/* eslint-disable react/prop-types */
import { useState } from "react";
import TagInput from "../../components/TagInput/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddEditNotes = ({
  type,
  noteData,
  getAllNotes,
  closeModal,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],

    ["clean"], // remove formatting button
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
        getAllNotes(); // Ensure getAllNotes is called to fetch the updated list
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
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-xl text-slate-800 outline-none font-medium"
          placeholder="Go for a walk at 6"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">CONTENT</label>
        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          onChange={setContent}
          className="h-64 overflow-y-auto"
        />
      </div>
      <div className="mt-auto">
        <div className="flex flex-col gap-2 mt-3">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
        {error && (
          <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
        )}
        <button className="btn-primary" onClick={handleAddNote}>
          {type === "edit" ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
