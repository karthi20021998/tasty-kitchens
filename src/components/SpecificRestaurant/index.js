import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'

import NavBar from '../NavBar'
import Footer from '../Footer'
import FoodCard from '../FoodCard'
import './index.css'

const SpecificRestaurant = props => {
  const [response, setResponse] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {match} = props
  const {params} = match
  const {id} = params

  const getUpdatedData = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    foodItems: data.food_items.map(eachItem => ({
      cost: eachItem.cost,
      foodType: eachItem.food_type,
      foodId: eachItem.id,
      imageUrl: eachItem.image_url,
      name: eachItem.name,
      rating: eachItem.rating,
    })),
  })

  const fetchSpecificRestaurantApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(url, options)
    const data = await apiResponse.json()
    setResponse(getUpdatedData(data))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSpecificRestaurantApi()
    // eslint-disable-next-line
  }, [])

  const renderLoader = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        heigth="50"
        width="50"
        color="#F7931E"
        testid="restaurants-list-loader"
      />
    </div>
  )

  const renderRestaurant = () => {
    const {
      foodItems,
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = response
    return (
      <>
        <div className="specific-res-bg-container">
          <img src={imageUrl} alt="restaurant" className="specific-res-image" />
          <div className="details-card">
            <h1 className="specific-res-name">{name}</h1>
            <p className="specific-res-cuisine">{cuisine}</p>
            <p className="specific-res-location">{location}</p>
            <div className="rating-costs-card">
              <div>
                <p className="specific-res-rating">
                  <FaStar /> {rating}
                </p>
                <p className="specific-res-review">{reviewsCount}+ ratings</p>
              </div>
              <hr className="vertical-line" />
              <div>
                <p className="specific-res-cost">₹ {costForTwo}</p>
                <p className="specific-res-cost-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="foodlist-container">
          {foodItems.map(eachItem => (
            <FoodCard foodDetails={eachItem} key={eachItem.foodId} />
          ))}
        </ul>
      </>
    )
  }

  return (
    <>
      <NavBar />
      {isLoading ? renderLoader() : renderRestaurant()}
      <Footer />
    </>
  )
}

export default SpecificRestaurant
