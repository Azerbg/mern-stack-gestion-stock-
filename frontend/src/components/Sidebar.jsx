import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar bg-gradient-to-r from-blue-800 via-purple-900 to-indigo-900 text-white w-80 h-full p-6 shadow-2xl rounded-l-lg">
      <h2 className="sidebar-title text-3xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        stock gestion{" "}
      </h2>
      <hr className="mb-8 border-gray-600" />
      <nav>
        <ul className="sidebar-list space-y-6">
          <li>
            <NavLink
              to="/home"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              activeClassName="active bg-green-500 shadow-2xl transform scale-105"
            >
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Categorie"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              activeClassName="active bg-green-500 shadow-2xl transform scale-105"
            >
              Categorie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/commandes"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              activeClassName="active bg-green-500 shadow-2xl transform scale-105"
            >
              Commandes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fournisseurs"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              activeClassName="active bg-green-500 shadow-2xl transform scale-105"
            >
              Fournisseur
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inventory"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              activeClassName="active bg-green-500 shadow-2xl transform scale-105"
            >
              Rapports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="sidebar-link text-xl font-semibold py-3 px-5 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-xl transition-all duration-300"
              activeClassName="active bg-red-600 shadow-2xl transform scale-105"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
