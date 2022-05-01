import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      src="https://res.cloudinary.com/suraj4/image/upload/v1640103050/erroring_1_lzeflz.png"
      alt="Not Found"
    />
    <h1 className="notFoundHead">Page Not Found</h1>
    <p className="notFoundPara">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="notFoundBut">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
