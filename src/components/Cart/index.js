import './index.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'

const statusVariable = {
  emptyCart: 'noOrder',
  cartFull: 'fullCart',
  placeOrder: 'paymentCompleted',
}

class Cart extends Component {
  state = {
    storageItem: [],
    status: statusVariable.emptyCart,
    totalOrder: 0,
  }

  componentDidMount() {
    this.getTotal()
    this.setLocalStorage()
  }

  getTotal = () => {
    const localElements = JSON.parse(localStorage.getItem('cartData'))
    const total = []

    if (localElements !== null) {
      if (localElements.length) {
        localElements.map(items => total.push(items.cost * items.quantity))
        const finalTotal = total.reduce((final, item) => final + item)
        this.setState({totalOrder: finalTotal})
      }
    }
  }

  onClickPlaceOrder = () => {
    this.setState({status: statusVariable.placeOrder})
  }

  totalFunction = value => {
    this.setState({totalOrder: value})
  }

  onPlaceOrderFunction = () => {
    localStorage.removeItem('cartData')
    return (
      <div>
        <Header />
        <div className="paymentSuccessful">
          <div className="insidePayment">
            <img
              src="https://res.cloudinary.com/suraj4/image/upload/v1642938483/Vector_1_ac3ti5.png"
              alt="tick"
            />
            <h1 className="orderPlacedText">Payment Successful</h1>
            <p>
              Thank you for ordering Your payment is successfully completed.
            </p>
            <Link to="/">
              <button type="button" className="goHomeBut">
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  setLocalStorage = () => {
    const localItem = localStorage.getItem('cartData')
    const modifiedItem = JSON.parse(localItem)
    this.setState({storageItem: modifiedItem})
    if (modifiedItem !== null) {
      if (modifiedItem.length === 0) {
        this.setState({status: statusVariable.emptyCart})
      } else {
        this.setState({status: statusVariable.cartFull})
      }
    } else {
      this.setState({status: statusVariable.emptyCart})
    }
  }

  emptyCartFunction = () => (
    <div>
      <Header />
      <div className="noOrdersContainer">
        <img
          src="https://res.cloudinary.com/suraj4/image/upload/v1642433404/cooking_1_pnbgd8.png"
          alt="empty cart"
          className="noImg"
        />
        <h1 className="noOrderHead">No Order Yet!</h1>
        <p className="noPara">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="orderBut">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  )

  switchFunction = () => {
    const {status} = this.state
    switch (status) {
      case statusVariable.emptyCart:
        return this.emptyCartFunction()
      case statusVariable.cartFull:
        return this.fullCartFunction()
      case statusVariable.placeOrder:
        return this.onPlaceOrderFunction()
      default:
        return this.emptyCartFunction()
    }
  }

  fullCartFunction = () => {
    const {storageItem, totalOrder} = this.state
    return (
      <div>
        <Header />
        <div className="cartMainContainer">
          <div className="cartItemsDisplay">
            <div className="headContainer">
              <h1 className="cartHead">Item</h1>
              <h1 className="cartHead">Quantity</h1>
              <h1 className="cartHead">Price</h1>
            </div>

            <ul className="cartUlContainer">
              {storageItem.map(item => (
                <CartItem
                  foodItem={item}
                  callBackFunction={this.setLocalStorage}
                  totalRender={this.totalFunction}
                  getTotalValue={this.getTotal}
                  key={item.id}
                />
              ))}
            </ul>
            <hr className="hrLine" />
            <div className="totalContainer">
              <h1 className="orderTotal">Order Total:</h1>
              <div>
                <p className="total" testid="total-price">
                  ₹{totalOrder}
                </p>
                <button
                  type="button"
                  className="orderBut"
                  onClick={this.onClickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return <div>{this.switchFunction()}</div>
  }
}

export default Cart
