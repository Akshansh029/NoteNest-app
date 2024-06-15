/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../index.css";
import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";
import AddEditNotes from "./AddEditNotes";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/ToastMessage";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import NotesPng from "../../assets/NotesPng.png";
import NoDataPng from "../../assets/no-data-png.png";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "edit",
    data: null,
  });

  const closeModal = () => {
    setOpenModal({
      isShown: false,
      type: "add",
      data: null,
    });
    setSelectedNote(null);
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "",
    });
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const handleEdit = (note) => {
    setOpenModal({ isShown: true, data: note, type: "edit" });
    setSelectedNote(note);
  };

  // Get userInfo API call
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes API integration
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        // console.log("Fetched notes:", response.data.notes);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred, please try again");
    }
  };

  //Delete note integration
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        // console.log("Note deleted successfully:", response.data.note);
        showToastMessage("Note deleted successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error updating note:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  //Search API integration
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Pin note API integration
  const pinNote = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/pin-note/" + noteId, {
        isPinned: !noteData.isPinned,
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
        console.log(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    const user = localStorage.getItem("user");
    if (user) {
      getUserInfo();
    }
  }, []);

  return (
    <div className={` ${isDarkMode ? "bg-darkBg" : ""} min-h-[100vh] w-full`}>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div
        className={`w-full body-height flex ${
          isDarkMode ? "bg-darkBg" : "bg-white"
        }`}
      >
        <div className="categories relative w-[15%] min-h-[100%] bg-transparent border-gray-700 border-r-[1px]">
          <button
            className={`p-4 absolute bottom-10 left-7 rounded-lg hover:bg-blue-500 hover:drop-shadow-md flex items-center gap-2 ${
              isDarkMode ? "bg-primaryDark" : "bg-primary"
            }`}
            onClick={() => {
              setOpenModal({ isShown: true, type: "add", data: null });
              setSelectedNote(null);
            }}
          >
            <div className="flex gap-2">
              <FaPlus className="text-white text-[20px]" />
              <h4 className="text-base font-semibold text-white max-[768px]:display-none">
                Create New
              </h4>
            </div>
          </button>
        </div>
        <div className="notes w-[25%] min-h-[100%] bg-transparent border-gray-700 border-r-[1px] p-4 overflow-y-auto hide-scrollbar">
          {allNotes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {allNotes.map((item) => (
                <CardNote
                  isDarkMode={isDarkMode}
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  tags={item.tags}
                  content={item.content}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  deleteNote={() => {
                    deleteNote(item);
                  }}
                  onPinNote={() => {
                    pinNote(item);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyCard
              isDarkMode={isDarkMode}
              notesImg={isSearch ? NoDataPng : NotesPng}
              message={
                isSearch ? (
                  <span className="flex items-center justify-center gap-1">
                    Oops! Can't find any matches for your search.
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    No notes yet! Click{" "}
                    <span className="font-semibold text-2xl">+</span> to capture
                    your first thought!
                  </span>
                )
              }
            />
          )}
        </div>
        <div className="editor w-[60%] min-h-[100%] bg-transparent p-4 bg-slate-100">
          {selectedNote || openModal.type === "add" ? (
            <AddEditNotes
              type={openModal.type}
              noteData={openModal.data}
              getAllNotes={getAllNotes}
              closeModal={closeModal}
              showToastMessage={showToastMessage}
              isDarkMode={isDarkMode}
              key={selectedNote ? selectedNote._id : "add"}
            />
          ) : (
            <p>Select a note to view its content</p>
          )}
        </div>
      </div>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
