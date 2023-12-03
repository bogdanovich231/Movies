import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <ul>
        <li>
          <Link to={"formuncontrol"}> Form </Link>
        </li>
        <li>
          <Link to={"formhook"}> Form Hook</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
