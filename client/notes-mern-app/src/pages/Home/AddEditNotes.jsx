const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-xl text-slate-800 outline-none font-medium"
          placeholder="Go for a walk at 6"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm bg-slate-50 text-slate-800 outline-none p-2 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label className="input-label">TAGS</label>
        <button className="btn-primary">Add</button>
      </div>
    </div>
  );
};

export default AddEditNotes;
