import { FiShield } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "History",
      path: "/history",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FiShield className="text-3xl text-blue-400" />

          <div>
            <h1 className="text-2xl font-bold">
              TruthLens AI
            </h1>

            <p className="text-sm text-gray-300">
              AI-Powered Misinformation Detection
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 font-medium">

          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.name}
              </button>
            );
          })}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;