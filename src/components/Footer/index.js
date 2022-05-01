import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerTastyContainer">
        <img
          src="https://res.cloudinary.com/suraj4/image/upload/v1641057199/Vector_pcjsqa.png"
          alt="website-footer-logo"
          className="footerTastyHead"
        />
        <h1 className="footerHead">Tasty Kitchen </h1>
      </div>
      <p className="footerPara">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footerIcons">
        <div className="pinContainer">
          <FaPinterestSquare testid="pintrest-social-icon" />
        </div>
        <FaInstagram className="footerIcon" testid="instagram-social-icon" />
        <FaTwitter className="footerIcon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="footerIcon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
