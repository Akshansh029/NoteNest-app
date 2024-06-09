import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <CardNote
            title="Meeting with Rimjhim at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
          <CardNote
            title="Meeting with Rimjhim at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
          <CardNote
            title="Meeting with Rimjhim at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
          <CardNote
            title="Meeting with Rimjhim at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
          <CardNote
            title="Meeting with Rimjhim at 5pm"
            date="16 June 2024"
            tags="#meeting"
            content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
            isPinned={true}
            deleteNote={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button className="bg-primary p-4 absolute right-10 bottom-10 rounded-lg hover:bg-blue-500 hover:drop-shadow-md flex items-center gap-2">
        <FaPlus className="text-white text-[30px]" />
        <span className="hidden text-white font-medium group-hover:flex">
          Create note
        </span>
      </button>
    </>
  );
};

export default Home;
