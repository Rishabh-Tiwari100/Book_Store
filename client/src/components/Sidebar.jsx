import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthServices";
const Sidebar = ({ navLinks }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout()).unwrap();
    if (!user) navigate("/login");
  };
  return (
    <div className="scrollbar-hide overflow-y-scroll w-64 bg-gradient-to-b from-zinc-800 to-zinc-700 text-white shadow-xl p-6 flex flex-col justify-between">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center text-center border-b border-zinc-600 pb-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-400 shadow-md mb-2">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-sm text-zinc-300">{user?.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="block px-4 py-2 rounded-md transition-all duration-200 hover:bg-zinc-600 hover:text-white text-zinc-300 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm"
      >
        <span>Logout</span>
        <IoLogOutOutline size={20} />
      </button>
    </div>
  );
};

export default Sidebar;
