import CourseLogo from '../assets/rs_school_js.svg';
import { Outlet, Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="autor">
                    <h4>Made in:</h4>
                    <a href="https://github.com/bogdanovich231">Tatsiana Kulinkovich</a>
                </div>
                <div className="copyright">
                    <Link to={`/`}>Movies</Link>
                    <p>&copy;copyright 2023</p>
                </div>
                <div className="course">
                    <a href="https://rs.school/">
                        <img src={CourseLogo} alt="logo course" />
                    </a>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Footer;