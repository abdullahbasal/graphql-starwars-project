import "./Header.css";
import Logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="logo-container">
        <img src={Logo} alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className="navbar">
        <NavLink
          to="/characters"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          CHARACTERS
        </NavLink>
        <NavLink to={"/films"}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }>
          FILMS
        </NavLink>
        <NavLink to={"/vehicles"}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }>
          VEHICLES
        </NavLink>
      </div>
    </>
  );
};

export default Header;
