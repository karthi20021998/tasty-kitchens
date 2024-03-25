import {MdSort} from 'react-icons/md'
import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, activeOptionId, updateActiveOptionId} = props

  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="res-header-container">
      <h1 className="res-header-name">Popular Restaurants</h1>
      <div className="text-card">
        <p className="res-header-text">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-card">
          <MdSort className="sort-by-icon" />
          <p className="sort-by-text">Sort by</p>
          <select
            value={activeOptionId}
            onChange={onChangeSortBy}
            className="sort-by-select"
          >
            {sortByOptions.map(eachOption => (
              <option
                className="select-option"
                value={eachOption.value}
                key={eachOption.id}
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
