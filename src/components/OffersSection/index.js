import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import SliderItem from '../SliderItem'
import './index.css'

const status = {
  onLoading: 'loading',
  onFailure: 'Failure',
  onSuccess: 'Success',
}

class ReactSlider extends Component {
  state = {
    imgObj: [],
    actualState: status.onLoading,
  }

  componentDidMount() {
    this.responseFunction()
  }

  responseFunction = async () => {
    this.setState({actualState: status.onLoading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      const updatedData = responseData.offers.map(image => ({
        imageUrl: image.image_url,
        id: image.id,
      }))
      this.setState({imgObj: updatedData, actualState: status.onSuccess})
    }
  }

  SuccessFunction = () => {}

  SwitchFunction = () => {
    const {actualState} = this.state
    switch (actualState) {
      case status.onSuccess:
        return this.SuccessFunction()
      case status.onLoading:
        return this.isLoading()
      default:
        return this.isLoading()
    }
  }

  isLoading = () => (
    <div testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#F7931E" height={80} width={80} />
    </div>
  )

  render() {
    const settings = {
      dots: true,
    }
    const {imgObj} = this.state

    return (
      <div className="sliderContainer">
        <Slider {...settings}>
          {imgObj.map(image => (
            <SliderItem imageItem={image} key={image.id} />
          ))}
        </Slider>
        <div>{this.SwitchFunction()}</div>
      </div>
    )
  }
}
export default ReactSlider
