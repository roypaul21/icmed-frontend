import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function DefaultFooter({loginModalOpened}) {
    const loginModalOpen = () => {
        loginModalOpened();
    }

    return (
        <section className="default-footer-section">
            <div className="default-footer-content">
                <div className="default-footer-social">
                    <div><FaFacebookSquare /></div>
                    <div><FaXTwitter /></div>
                    <div><FaInstagramSquare /></div>
                    <div><FaLinkedin /></div>
                    <div><FaYoutube /></div>
                </div>
                <div className="default-footer-navlink">
                    <Link id="footer--font" className="nav-link">Landing</Link>
                    <Link id="footer--font" className="nav-link">About Us</Link>
                    <Link id="footer--font" className="nav-link" to="/signup">Register</Link>
                    <Link id="footer--font" className="nav-link">Contact Us</Link>
                    <button id="footer--font" className="nav-link" onClick={loginModalOpen}>Login</button>
                </div>
            </div>
            <div className="default-footer-btm">
                <div><img src="images/icmed_footer.svg" alt="icmed" /></div>
                <p>Copyright 2024 icmed All Rights Reserved.</p>
            </div>
        </section>
    )
}