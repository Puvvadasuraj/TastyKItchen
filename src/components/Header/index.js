import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'
import {GoThreeBars} from 'react-icons/go'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {activeItem: 'Home', display: false}

  onHome = () => {
    this.setState({activeItem: 'Home'})
  }

  onCart = () => {
    this.setState({activeItem: 'Cart'})
  }

  onBar = () => {
    this.setState({display: true})
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  displayHeadMobile = () => {
    this.setState({display: false})
  }

  render() {
    const {activeItem, display} = this.state
    const HomeClass = activeItem === 'Home' ? 'homeBut' : 'cart'
    const CartClass = activeItem === 'Cart' ? 'homeBut' : 'cart'
    return (
      <div>
        <div className="headerContainer">
          <Link to="/" className="linkItem">
            <div className="tastyHead">
              <img
                src="https://res.cloudinary.com/suraj4/image/upload/v1639816944/Frame_274_1_v8tqf5.png"
                alt="website logo"
              />
              <h1 className="headerHead">Tasty Kitchen</h1>
            </div>
          </Link>
          <ul className="headerButtons">
            <Link to="/" className="linkItem">
              <li className={`${HomeClass}`} onClick={this.onHome}>
                Home
              </li>
            </Link>
            <Link to="/cart" className="linkItem">
              <li className={`${CartClass}`} onClick={this.onCart}>
                Cart
              </li>
            </Link>
            <li>
              <button type="button" className="logout" onClick={this.onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="mobileImgContainer tastyHead">
            <Link to="/" className="linkItem">
              <div className="mobileImgContainer">
                <img
                  src="https://res.cloudinary.com/suraj4/image/upload/v1639816944/Frame_274_1_v8tqf5.png"
                  alt="website logo"
                  className="mobileImgItem"
                />
                <h1 className="headerHead">Tasty Kitchen</h1>
              </div>
            </Link>
            <GoThreeBars size="45" className="three" onClick={this.onBar} />
          </div>
        </div>
        {display && (
          <div className="closeContainer">
            <ul className="headerButtonsMobile">
              <Link to="/" className="linkItem">
                <li className={`${HomeClass}`} onClick={this.onHome}>
                  Home
                </li>
              </Link>
              <Link to="/cart" className="linkItem">
                <li className={`${CartClass}`} onClick={this.onCart}>
                  Cart
                </li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout"
                  onClick={this.onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <AiFillCloseCircle
              className="closeItem"
              size="40"
              onClick={this.displayHeadMobile}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
