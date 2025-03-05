import React from "react";
import logo from "../../assets/images/leaves.png";
import { Link } from "react-router-dom";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <img src={logo} alt="logo" />
          <h5>Tasty Treat</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            pariatur accusamus
          </p>
        </div>

        <div className="footer__section">
          <h5 className="footer__title">Open Time</h5>
          <div className="deliver__time-list">
            <div className="delivery__time-item">
              <span>Sunday - Thursday</span>
              <p>10:00am - 11:00pm</p>
            </div>
            <div className="delivery__time-item">
              <span>Friday - Saturday</span>
              <p>Off day</p>
            </div>
          </div>
        </div>

        <div className="footer__section">
          <h5 className="footer__title">Contact</h5>
          <div className="deliver__time-list">
            <div className="delivery__time-item">
              <p>Location: Nochchimunai, Batticaloa, Srilanka</p>
            </div>
            <div className="delivery__time-item">
              <span>Phone: 0750866441</span>
            </div>
            <div className="delivery__time-item">
              <span>Email: s@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="footer__section">
          <h5 className="footer__title">Newsletter</h5>
          <p>Subscribe to our newsletter</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <span className="newsletter__button">
              <i className="ri-send-plane-line"></i>
              <SendIcon />
            </span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="copyright__text">
          Copyright - {new Date().getFullYear()}, website made by Shahan Yuki.
          All Rights Reserved.
        </div>
        <div className="social__links">
          <p>Follow: </p>
          <Link to="https://www.facebook.com/muhib160">
            <FacebookIcon style={{ color: "#dc2626" }} />
          </Link>
          <Link to="https://github.com/muhib160">
            <GitHubIcon style={{ color: "#dc2626" }} />
          </Link>
          <Link to="https://www.youtube.com/c/MuhibsTechDiary">
            <YouTubeIcon style={{ color: "#dc2626" }} />
          </Link>
          <Link to="https://www.linkedin.com/in/muhib160/">
            <LinkedInIcon style={{ color: "#dc2626" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
