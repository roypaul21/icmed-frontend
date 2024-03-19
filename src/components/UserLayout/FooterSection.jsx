import { Link } from "react-router-dom/dist";
import { FaRegCopyright } from "react-icons/fa";
import { TiHeart } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function FooterSection() {
    return (
        <section className="footer-section">
            <div className="footer-container">
                <div className="footer-content">
                    <Link to="/store" className="footer-text">Store</Link>
                    <Link className="footer-text">Cart</Link>
                    <Link className="footer-text">Pending</Link>
                    <Link className="footer-text">Contact Us</Link>
                    <p className="footer-text"><FaRegCopyright />Copyright 2024 icmed All Rights Reserved.</p>
                </div>
                <div className="footer-logo">
                    <div>
                        <img src="images/icmed_footer.svg"/>
                        <p><FaPhoneAlt />+63 965 420 7225</p>
                        <p><MdEmail />icmed@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="footer-line"></div>
            <div className="footer-icons">
                <FaFacebookSquare />
                <FaXTwitter />
                <FaInstagramSquare />
                <FaWhatsappSquare />
            </div>
            <p>Made by Yoroy<TiHeart /></p>
        </section>
    )
}