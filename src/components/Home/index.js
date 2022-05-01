import {Component} from 'react'
import Header from '../Header'
import HotelItems from '../HotelItems'
import Footer from '../Footer'
import OfferSection from '../OffersSection'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <OfferSection />
        <div className="homeClass">
          <HotelItems />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
