import { NavLink } from "react-router-dom";
import { FiCheckCircle, FiClock, FiLogOut } from "react-icons/fi";
import "../../styles/SideAd.css";

export default function SideAd() {
  return (
    <div className="sideAD">
      <h2 className="sideAD-title">Admin Panel</h2>
      <hr />
      <nav>
        <ul className="sideAD-list">
          <li>
            <NavLink
              to="/Admin/homeAd"
              className="sideAD-link"
              activeClassName="active"
            >
              <FiCheckCircle /> <span>Approved</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Admin/PendingAd"
              className="sideAD-link"
              activeClassName="active"
            >
              <FiClock /> <span>Pending</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="sideAD-link logout"
              activeClassName="active"
            >
              <FiLogOut /> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
