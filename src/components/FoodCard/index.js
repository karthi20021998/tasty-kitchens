import {useState, useContext} from 'react'
import {FaStar} from 'react-icons/fa'

import CartContext from '../../context/CartContext'
import './index.css'

const FoodCard = props => {
  const {foodDetails} = props
  const {cost, imageUrl, name, rating} = foodDetails

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)

  const onIncrement = () => {
    setQuantity(prevState => prevState + 1)
  }

  const onDecrement = () => {
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))
  }

  const onClickAddtoCart = () => {
    addCartItem({...foodDetails, quantity})
  }

  const renderQuantityOptions = () => (
    <div className="quantity-container">
      <button type="button" className="dec-button" onClick={onDecrement}>
        -
      </button>
      <p className="quantity-text">{quantity}</p>
      <button type="button" className="inc-button" onClick={onIncrement}>
        +
      </button>
    </div>
  )

  return (
    <li className="food-item-container">
      <img src={imageUrl} alt="foodimage" className="food-image" />
      <div className="food-details-card">
        <h1 className="food-name">{name}</h1>
        <h2 className="food-cost">₹ {cost}.00</h2>
        <p className="food-rating">
          <FaStar className="food-icon" />
          {rating}
        </p>
        {renderQuantityOptions()}
        {quantity > 0 && (
          <button
            type="button"
            className="food-add-btn"
            onClick={onClickAddtoCart}
          >
            ADD
          </button>
        )}
      </div>
    </li>
  )
}

export default FoodCard
