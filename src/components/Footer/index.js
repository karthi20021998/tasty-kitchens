import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="heading-card">
      <img
        src="https://res.cloudinary.com/dghnaymwn/image/upload/v1710593015/Frame_275_xuvbo2.png"
        alt="website-footer-logo"
        className="footer-image"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-text">
      The only thing we are serious about is food. <br /> Contact us on
    </p>

    <div className="icons-card">
      <FaPinterestSquare
        className="footer-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="footer-icon" testid="instagram-social-icon" />
      <FaTwitter className="footer-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="footer-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
