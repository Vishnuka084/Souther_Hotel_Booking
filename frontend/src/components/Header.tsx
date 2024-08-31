import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const {isLoggedIn} = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">SouthernBooking.com</Link>
        </span>
        <span className="flex space-x-4">
          {isLoggedIn ? <>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/my-hotels">My Hotels</Link>
            <button>Sing out</button>
          </> :           <Link
            to="/sign-in"
            className="flex bg-white item-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded"
          >
            Sign in
          </Link>
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
