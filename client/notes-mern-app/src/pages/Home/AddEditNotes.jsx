import { useState } from "react";
import TagInput from "../../components/TagInput/TagInput";

const AddEditNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

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
        <textarea
          type="text"
          className="text-sm bg-slate-50 text-slate-800 outline-none p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
      )}

      <button
        className="btn-primary"
        onClick={() => {
          handleAddNote();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNotes;
