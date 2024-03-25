import {useState, useEffect} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'
import Footer from '../Footer'
import RestaurantHeader from '../RestaurantHeader'
import RestaurantList from '../RestaurantList'
import Counter from '../Counter'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const Home = () => {
  const [response, setResponse] = useState({})
  const [imagesList, setImagesList] = useState([])
  const [activeOptionId, setActiveOptionId] = useState(sortByOptions[1].value)
  const [isLoading, setisLoading] = useState(true)

  const getUpdatedData = data => ({
    restaurantList: data.restaurants.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      cuisine: each.cuisine,
      name: each.name,
      userRating: {
        rating: each.user_rating.rating,
        ratingColor: each.user_rating.rating_color,
        ratingText: each.user_rating.rating_text,
        totalReviews: each.user_rating.total_reviews,
      },
    })),
  })

  const fetchRestaurantApi = async (currPage = 1) => {
    const LIMIT = 9
    const offset = (currPage - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOptionId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const data = await apiResponse.json()
    setResponse(getUpdatedData(data))
    setisLoading(false)
  }

  const fetchOffersApi = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiOffersResponse = await fetch(url, options)
    const data = await apiOffersResponse.json()

    const getUpdatedOffer = data.offers.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))

    setImagesList(getUpdatedOffer)
    setisLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
    // eslint-disable-next-line
  }, [activeOptionId])

  useEffect(() => {
    fetchOffersApi()
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

  const updateActiveOptionId = activeId => setActiveOptionId(activeId)

  const renderRestaurantList = () => {
    const {restaurantList} = response
    return (
      <>
        <RestaurantHeader
          sortByOptions={sortByOptions}
          activeOptionId={activeOptionId}
          updateActiveOptionId={updateActiveOptionId}
        />
        <ul className="res-list-container">
          {restaurantList &&
            restaurantList.map(eachItem => (
              <RestaurantList dishDetails={eachItem} key={eachItem.id} />
            ))}
        </ul>
        <Counter apiCallBack={fetchRestaurantApi} />
      </>
    )
  }

  const renderCarousels = () => {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: 'linear',
      arrows: false,
    }
    return (
      <Slider {...settings}>
        {imagesList.map(eachImage => (
          <div className="carousel-container" key={eachImage.id}>
            <img
              src={eachImage.imageUrl}
              alt={eachImage.id}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    )
  }

  return (
    <>
      <NavBar />
      {isLoading && renderLoader()}
      {!isLoading && renderCarousels()}
      {!isLoading && renderRestaurantList()}
      <Footer />
    </>
  )
}

export default Home
