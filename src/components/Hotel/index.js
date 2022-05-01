import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const Hotel = details => {
  const {item} = details
  const {imageUrl, name, cuisine, rating, totalReviews, id} = item
  return (
    <Link to={`/restaurant/${id}`} className="hotelLink">
      <li className="hotelContainer" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="hotelImg" />
        <div className="textContainer">
          <h1 className="hotelName">{name}</h1>
          <p className="hotelPara">{cuisine}</p>
          <div className="ratingContainer">
            <AiFillStar color="#FFCC00" />
            <p className="ratingItem"> {rating} </p>
            <p className="totalReviews">( {totalReviews} ratings )</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Hotel
