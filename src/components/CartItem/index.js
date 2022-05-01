import {Component} from 'react'
import './index.css'

class CartItem extends Component {
  state = {
    countVariable: 0,
  }

  componentDidMount() {
    const {foodItem} = this.props
    const {quantity} = foodItem
    this.setState({countVariable: quantity})
  }

  updateLocalItem = () => {
    const {countVariable} = this.state
    const localItem = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const {id} = foodItem
    foodItem.quantity = countVariable
    const filteredItem = localItem.filter(Item => Item.id !== id)
    filteredItem.push(foodItem)
    const stringifiedItem = JSON.stringify(filteredItem)
    localStorage.setItem('cartData', stringifiedItem)
    const {totalRender} = this.props
    const localElements = JSON.parse(localStorage.getItem('cartData'))
    const total = []
    localElements.map(items => total.push(items.cost * items.quantity))
    const finalTotal = total.reduce((final, item) => final + item)
    totalRender(finalTotal)
  }

  countIncreaseFunction = () => {
    this.setState(
      prevCount => ({countVariable: prevCount.countVariable + 1}),
      this.updateLocalItem,
    )
  }

  countDecreaseFunction = () => {
    const {countVariable} = this.state
    if (countVariable > 1) {
      this.setState(
        prevCount => ({countVariable: prevCount.countVariable - 1}),
        this.updateLocalItem,
      )
    } else {
      const localItem = JSON.parse(localStorage.getItem('cartData'))
      const {foodItem, callBackFunction, getTotalValue} = this.props
      if (localItem.length !== 1) {
        const {id} = foodItem
        const filteredItem = localItem.filter(Item => Item.id !== id)
        const stringifiedItem = JSON.stringify(filteredItem)
        localStorage.setItem('cartData', stringifiedItem)
        callBackFunction()
        getTotalValue()
      } else {
        localStorage.removeItem('cartData')
        callBackFunction()
      }
    }
  }

  render() {
    const {foodItem} = this.props
    const {imageUrl, cost, name} = foodItem
    const {countVariable} = this.state
    return (
      <li className="liContainer" testid="cartItem">
        <div className="imgContainer">
          <img src={imageUrl} alt={name} className="cartItemImg" />
        </div>
        <div className="detailsContainer">
          <h1 className="cartItemName">{name}</h1>
          <div className="itemCountContainer">
            <button
              type="button"
              className="minusContainer"
              onClick={this.countDecreaseFunction}
              testid="decrement-quantity"
            >
              -
            </button>
            <p className="totalCount" testid="item-quantity">
              {countVariable}
            </p>
            <button
              type="button"
              className="minusContainer"
              onClick={this.countIncreaseFunction}
              testid="increment-quantity"
            >
              +
            </button>
          </div>
          <p className="cartNameCost">₹{countVariable * cost}.00</p>
        </div>
      </li>
    )
  }
}

export default CartItem
