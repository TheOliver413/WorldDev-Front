import { Link } from "react-router-dom";

const NavItem = ({ label, path }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link text-dark" to={path}>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
