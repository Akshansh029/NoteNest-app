import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

const Home = () => {
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

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <CardNote
            title="Meeting with Bosco at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Bosco in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="bg-primary p-4 absolute right-10 bottom-10 rounded-lg hover:bg-blue-500 hover:drop-shadow-md flex items-center gap-2"
        onClick={() => {
          setOpenModal({ isShown: true, type: "add", data: null });
        }}
      >
        <FaPlus className="text-white text-[25px]" />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-5 w-[40%] max-h-90vh overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-20"
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
};

export default Home;
