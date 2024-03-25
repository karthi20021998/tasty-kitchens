import {useState, useEffect} from 'react'
import './index.css'

const Counter = props => {
  const {apiCallBack} = props
  const totalPages = 4

  const [pageNo, setPageNo] = useState(1)

  const onIncrement = () => {
    setPageNo(prevState => {
      if (prevState < totalPages) {
        return prevState + 1
      }
      return prevState
    })
  }

  const onDecrement = () => {
    setPageNo(prevState => {
      if (prevState > 1) {
        return prevState - 1
      }
      return prevState
    })
  }

  useEffect(() => {
    apiCallBack(pageNo)
    // eslint-disable-next-line
  }, [pageNo])

  return (
    <div className="counter-container">
      <button type="button" onClick={onDecrement} className="counter-button">
        -
      </button>
      <div className="active-page">
        <span>{pageNo}</span> of 4
      </div>
      <button type="button" onClick={onIncrement} className="counter-button">
        +
      </button>
    </div>
  )
}

export default Counter
