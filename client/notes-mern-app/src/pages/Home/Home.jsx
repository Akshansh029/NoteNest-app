/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/ToastMessage";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const closeModal = () => {
    setOpenModal({
      isShown: false,
      type: "add",
      data: null,
    });
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

  const handleEdit = (noteDetails) => {
    setOpenModal({ isShown: true, data: noteDetails, type: "edit" });
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
        console.log("Fetched notes:", response.data.notes);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred, please try again");
    }
  };

  //Delete note
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && response.data.note) {
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

  useEffect(() => {
    getAllNotes();
    const user = localStorage.getItem("user");
    if (user) {
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto my-8">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <CardNote
              key={item._id}
              title={item.title}
              date={item.createdOn}
              tags={item.tags}
              content={item.content}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              deleteNote={() => {
                deleteNote;
              }}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>

      <button
        className="bg-primary p-4 fixed bottom-10 right-10 rounded-lg hover:bg-blue-500 hover:drop-shadow-md flex items-center gap-2"
        onClick={() => {
          setOpenModal({ isShown: true, type: "add", data: null });
        }}
      >
        <FaPlus className="text-white text-[25px]" />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-5 w-[40%] max-h-90vh overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-20"
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openModal.type}
          noteData={openModal.data}
          getAllNotes={getAllNotes}
          closeModal={closeModal}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
