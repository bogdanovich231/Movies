import { Link } from "react-router-dom";
import './NotFound.scss';

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound_title">
        <h1>404</h1>
      </div>
      <div className="notfound_description">
        <p>Page not found</p>
        <Link to={"/"}>Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
