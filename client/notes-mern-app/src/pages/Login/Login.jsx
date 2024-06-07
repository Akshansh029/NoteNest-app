import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={() => {}} className="">
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" placeholder="Email" className="input-box" />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Don't have an account{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
