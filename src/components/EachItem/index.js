import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import HotelFoodItem from '../HotelFoodItem'
import './index.css'

const status = {
  onLoading: 'loading',
  onFailure: 'Failure',
  onSuccess: 'Success',
}

class IndividualItem extends Component {
  state = {
    headerItem: '',
    MenuItems: '',
    statusState: status.onLoading,
  }

  componentDidMount() {
    this.getHotelItem()
  }

  isLoading = () => (
    <div testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#F7931E" height={80} width={80} />
    </div>
  )

  getHotelItem = async () => {
    this.setState({statusState: status.onLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: data.food_items,
      }

      const menuItems = updatedData.foodItems.map(item => ({
        name: item.name,
        cost: item.cost,
        foodType: item.food_type,
        imageUrl: item.image_url,
        id: item.id,
        rating: item.rating,
      }))
      this.setState({
        statusState: status.onSuccess,
        headerItem: updatedData,
        MenuItems: menuItems,
      })
    } else {
      this.setState({statusState: status.onFailure})
    }
  }

  isSuccess = () => {
    const {headerItem, MenuItems} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      opensAt,
      location,
      itemsCount,
    } = headerItem
    return (
      <div testid="restaurant-item">
        <div className="imageContainer">
          <img src={imageUrl} alt="restaurant" className="hotelItemImg" />
          <div className="contentContainer">
            <h1 className="hotelHead">{name}</h1>
            <p className="hotelParaItem">{cuisine}</p>
            <p className="hotelParaItem">{location}</p>
            <p className="hotelParaItem">
              Start from <span className="spanColour">{opensAt}</span>
            </p>
            <p className="hotelParaItem">
              No .of Items :{' '}
              <span className="spanColour">{itemsCount} Items</span>
            </p>
            <div className="verticalItem">
              <div className="leftItem">
                <div className="ratingContainerItem">
                  <AiFillStar />
                  <p className="ratingValue">{rating}</p>
                </div>
                <p className="hotelParaItem">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="hrItem" />
              <div className="costItemContainer">
                <p className="costItem">₹ {costForTwo}</p>
                <p className="costItem">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="eachItemUlContainer">
          {MenuItems.map(Item => (
            <HotelFoodItem foodItem={Item} key={Item.id} />
          ))}
        </ul>
      </div>
    )
  }

  try = () => {
    this.getHotelItem()
  }

  isFailure = () => (
    <div className="failurePage">
      <img
        src="https://res.cloudinary.com/suraj4/image/upload/v1640103050/erroring_1_lzeflz.png"
        alt="FailedImage"
      />
      <h1 className="failureHead">Oops Something Went Wrong</h1>
      <p className="failPara">
        We are Sorry for the inconvenience we will get it solved as fast as we
        can...
      </p>
      <button type="button" className="retryButton" onClick={this.try}>
        Retry
      </button>
    </div>
  )

  SwitchFunction = () => {
    const {statusState} = this.state
    switch (statusState) {
      case status.onLoading:
        return this.isLoading()
      case status.onSuccess:
        return this.isSuccess()
      case status.onFailure:
        return this.isFailure()
      default:
        return this.isLoading()
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.SwitchFunction()}
        <Footer />
      </div>
    )
  }
}

export default IndividualItem
