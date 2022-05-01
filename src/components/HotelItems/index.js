import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdSort} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import Counter from '../Counter'
import Hotel from '../Hotel'
import './index.css'

const status = {
  onLoading: 'loading',
  onFailure: 'Failure',
  onSuccess: 'Success',
}

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

class HotelItems extends Component {
  state = {
    activePage: 1,
    limit: 9,
    isStatus: status.onLoading,
    details: '',
    searchInput: '',
    changeState: sortByOptions[1].value,
  }

  componentDidMount() {
    this.getHotels()
  }

  getHotels = async () => {
    this.setState({isStatus: status.onLoading})
    const {changeState, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, limit} = this.state
    const offset = (activePage - 1) * limit

    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=9&sort_by_rating=${changeState}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(hotel => ({
        hasOnlineDelivery: hotel.has_online_delivery,
        userRating: hotel.user_rating,
        ratingText: hotel.user_rating.rating_text,
        hasTableBooking: hotel.has_table_booking,
        name: hotel.name,
        costForTwo: hotel.cost_for_two,
        cuisine: hotel.cuisine,
        imageUrl: hotel.image_url,
        id: hotel.id,
        menuType: hotel.menu_type,
        location: hotel.location,
        opensAt: hotel.opens_at,
        groupByTime: hotel.group_by_time,
        ratingColor: hotel.user_rating.rating_color,
        rating: hotel.user_rating.rating,
        totalReviews: hotel.user_rating.total_reviews,
      }))
      this.setState({
        details: updatedData,
        isStatus: status.onSuccess,
      })
    } else {
      this.setState({isStatus: status.onFailure})
    }
  }

  isSuccess = () => {
    const {details} = this.state
    return (
      <ul className="successContainer">
        {details.map(hotelItem => (
          <Hotel item={hotelItem} key={hotelItem.id} />
        ))}
      </ul>
    )
  }

  changeFunction = event => {
    this.setState({changeState: event.target.value}, this.getHotels)
  }

  searchFunction = event => {
    this.setState({searchInput: event.target.value}, this.getHotels)
  }

  sortHeader = () => {
    const {changeState} = this.state
    return (
      <div className="sortHeader">
        <h1 className="popR">Popular Restaurants</h1>
        <div className="sortBox">
          <p className="caption">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sortOptionBox">
            <div className="containerInput">
              <BiSearch className="iContainer" color="#0F172A" />
              <input
                type="search"
                className="input"
                placeholder="Search"
                onChange={this.searchFunction}
              />
            </div>
            <div className="sortElementBox">
              <MdSort className="sortLogo" />
              <p htmlFor="sort" className="sortLogo">
                Sort By
              </p>
              <select
                id="sort"
                className="sortBox"
                onChange={this.changeFunction}
                value={changeState}
              >
                {sortByOptions.map(option => (
                  <option
                    value={`${option.value}`}
                    className="sortItem"
                    key={option.id}
                  >
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
      </div>
    )
  }

  changeState = count => {
    this.setState({activePage: count}, this.getHotels)
  }

  isLoading = () => (
    <div testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#F7931E" height={80} width={80} />
    </div>
  )

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
      <button type="button" className="retryButton" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onRetry = () => {
    this.getHotels()
  }

  onSwitch = () => {
    const {isStatus} = this.state
    switch (isStatus) {
      case status.onLoading:
        return this.isLoading()
      case status.onFailure:
        return this.isFailure()
      case status.onSuccess:
        return this.isSuccess()
      default:
        return this.isLoading()
    }
  }

  render() {
    return (
      <div>
        {this.sortHeader()}
        <div className="appsContainer">
          {this.onSwitch()}
          <Counter changeOption={this.changeState} />
        </div>
      </div>
    )
  }
}

export default HotelItems
