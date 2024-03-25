import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const RestaurantList = props => {
  const {dishDetails} = props
  const {id, imageUrl, cuisine, name, userRating} = dishDetails
  const {rating, ratingColor, totalReviews} = userRating
  // testid="restaurant-item"

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li className="res-list-items-container">
        <img src={imageUrl} alt="restaurant" className="res-image" />
        <div className="name-card">
          <h1 className="res-name">{name}</h1>
          <h3 className="res-cuisine">{cuisine}</h3>
          <div className="rating-card">
            <FaStar color={ratingColor} className="res-icon" />
            <p className="res-rating">{rating}</p>
            <p className="res-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantList
