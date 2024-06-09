import Navbar from "../../components/Navbar/Navbar";
import CardNote from "../../components/CardNote/CardNote";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <CardNote
          title="Meeting with Rimjhim at 5pm"
          date="16 June 2024"
          tags="#meeting"
          content="Will meet Rimjhim in bilaspurat 5 pm and will hangout for sometime"
          isPinned={true}
        />
      </div>
    </>
  );
};

export default Home;
