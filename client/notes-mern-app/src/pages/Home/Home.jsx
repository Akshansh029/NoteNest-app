/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import "../../index.css";
import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";
import AddEditNotes from "./AddEditNotes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/ToastMessage";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import NotesPng from "../../assets/NotesPng.png";
import NoDataPng from "../../assets/no-data-png.png";
import SelectLightPng from "../../assets/selectlight.png";
import TagsCard from "../../components/TagsCard/TagsCard";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [allPinnedNotes, setAllPinnedNotes] = useState([]);
  const [tags, setTags] = useState([]);
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

  const AddNote = () => {
    setOpenModal({ isShown: true, type: "add", data: null });
    setSelectedNote(null);
  };

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
      // console.log("Response of user info: ", response.data);

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

  //Get all pinned notes integration
  const getPinnedNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-pinned-notes");
      if (response.data && response.data.notes) {
        // console.log("Pinned Notes:", response.data.notes);
        setAllPinnedNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching pinned notes:", error);
    }
  };

  //Get all tags API integration
  const getAllTags = async () => {
    try {
      const response = await axiosInstance.get("/get-all-tags");
      // console.log("Response: ", response.data);
      if (response.data && Array.isArray(response.data.tags)) {
        setTags(response.data.tags);
      } else {
        console.log("Tags not found or not an array");
      }
    } catch (error) {
      console.log(error.message);
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
        getAllTags();
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
        // console.log("Note updated successfully:", response.data.note);
        showToastMessage("Note updated successfully", "edit");
        getAllNotes();
        getPinnedNotes();
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
    getAllTags();
    getUserInfo();
    getPinnedNotes();
  }, []);

  return (
    <div className={` ${isDarkMode ? "bg-darkBg" : ""} min-h-[100vh] w-full`}>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setOpenModal={setOpenModal}
        setSelectedNote={setSelectedNote}
        AddNote={AddNote}
      />

      <div
        className={`w-full body-height flex relative ${
          isDarkMode ? "bg-darkBg" : "bg-white"
        }`}
      >
        <div className="categories w-[15%] min-h-[100%] bg-transparent border-gray-700 border-r-[1px] p-4 overflow-y-auto hide-scrollbar">
          <ProfileInfo
            isDarkMode={isDarkMode}
            onLogout={() => {
              navigate("/login");
            }}
            userInfo={userInfo}
          />
          <h4
            className={`text-sm font-semibold mt-4 ${
              isDarkMode ? "text-darkTextColor" : ""
            }`}
          >
            Tags
          </h4>
          {tags.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              {tags
                .sort((a, b) => a.localeCompare(b))
                .map((tag, index) => (
                  <TagsCard
                    key={index}
                    tagsHead={tag}
                    isDarkMode={isDarkMode}
                    onSearchNote={onSearchNote}
                  />
                ))}
            </div>
          ) : (
            <p>No tags yet!</p>
          )}
        </div>
        <div className="notes w-[25%] min-h-[100%] bg-transparent border-gray-700 border-r-[1px] p-4 overflow-y-auto hide-scrollbar">
          {allPinnedNotes.length > 0 && (
            <div className="mb-4">
              <h4
                className={`text-sm font-semibold ml-1 ${
                  isDarkMode ? "text-darkTextColor" : ""
                }`}
              >
                Pinned notes
              </h4>
              <div className="flex flex-col gap-4 mt-2">
                {allPinnedNotes.map((item) => (
                  <CardNote
                    isDarkMode={isDarkMode}
                    key={item._id}
                    title={item.title}
                    date={item.createdOn}
                    isPinned={item.isPinned}
                    onEdit={() => handleEdit(item)}
                    closeModal={closeModal}
                    deleteNote={() => {
                      deleteNote(item);
                    }}
                    onPinNote={() => {
                      pinNote(item);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="">
            <h4
              onClick={() => getAllNotes()}
              className={`text-sm font-semibold ml-1 cursor-pointer ${
                isDarkMode ? "text-darkTextColor" : ""
              }`}
            >
              All notes
            </h4>
            {allNotes.length > 0 ? (
              <div className="flex flex-col gap-4 mt-2">
                {allNotes
                  .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                  .map((item) => (
                    <CardNote
                      isDarkMode={isDarkMode}
                      key={item._id}
                      title={item.title}
                      date={item.createdOn}
                      isPinned={item.isPinned}
                      onEdit={() => handleEdit(item)}
                      closeModal={closeModal}
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
                      No notes yet! Click + to capture your thoughts
                    </span>
                  )
                }
              />
            )}
          </div>
        </div>
        <div className="editor w-[60%] min-h-[100%] bg-transparent p-4 bg-slate-100">
          {openModal.isShown ? (
            <AddEditNotes
              type={openModal.type}
              noteData={openModal.data}
              getAllNotes={getAllNotes}
              getAllTags={getAllTags}
              getPinnedNotes={getPinnedNotes}
              closeModal={closeModal}
              showToastMessage={showToastMessage}
              isDarkMode={isDarkMode}
              key={selectedNote ? selectedNote._id : "add"}
            />
          ) : (
            <EmptyCard
              isDarkMode={isDarkMode}
              notesImg={SelectLightPng}
              message={"Select a note to view its content"}
            />
          )}
        </div>
      </div>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Home;
