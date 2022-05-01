import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'

class HotelFoodItem extends Component {
  state = {
    activeButton: false,
    quantity: 1,
  }

  componentDidMount() {
    this.ItemPresence()
  }

  ItemPresence = () => {
    localStorage.getItem('')
  }

  functionCreation = () => {
    const {foodItem} = this.props
    const {id, cost, name, imageUrl} = foodItem
    const {quantity} = this.state
    const newObj = {id, name, cost, imageUrl, quantity}
    const localItem = localStorage.getItem('cartData')
    const parsedLocal = JSON.parse(localItem)
    if (parsedLocal === null) {
      const list = []
      list.push(newObj)
      const stringifiedItem = JSON.stringify(list)
      localStorage.setItem('cartData', stringifiedItem)
    } else {
      const updatedList = parsedLocal.filter(filterItem => filterItem.id !== id)
      updatedList.push(newObj)
      const stringifiedList = JSON.stringify(updatedList)
      localStorage.setItem('cartData', stringifiedList)
    }
  }

  removeElement = () => {
    const {foodItem} = this.props
    const {id} = foodItem
    const localItem = localStorage.getItem('cartData')
    const parsedLocal = JSON.parse(localItem)
    const updatedList = parsedLocal.filter(filterItem => filterItem.id !== id)
    const stringifiedList = JSON.stringify(updatedList)
    localStorage.setItem('cartData', stringifiedList)
  }

  alterState = () => {
    this.setState({activeButton: true}, this.functionCreation)
  }

  discard = () => {
    this.setState({activeButton: false})
  }

  onIncrement = () => {
    this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.functionCreation,
    )
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity === 1) {
      this.setState({activeButton: false}, this.removeElement)
    } else {
      this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.functionCreation,
      )
    }
  }

  render() {
    const {activeButton, quantity} = this.state
    const {foodItem} = this.props
    const {name, cost, foodType, rating, imageUrl} = foodItem
    return (
      <li className="foodImageContainer" testid="foodItem">
        <img src={imageUrl} alt={`${name}`} className="foodItemImage" />
        <div className="hotelFoodContainer">
          <h1 className="foodItemHead">{name}</h1>
          <p className="foodItemType">{foodType}</p>
          <div className="priceContainer">
            ₹<p className="priceContainer">{cost}</p>.00
          </div>
          <div className="foodItemStarContainer">
            <AiFillStar color=" #FFCC00" />
            <p className="rat">{rating}</p>
          </div>
          {!activeButton && (
            <button
              type="button"
              className="foodButtonBut"
              onClick={this.alterState}
            >
              ADD
            </button>
          )}
          {activeButton && (
            <div className="itemCountContainer">
              <button
                type="button"
                className="minusContainer"
                onClick={this.onDecrement}
                testid="decrement-count"
              >
                -
              </button>
              <p className="totalCount" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="minusContainer"
                onClick={this.onIncrement}
                testid="increment-count"
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default HotelFoodItem
