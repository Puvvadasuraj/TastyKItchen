import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  hitUsername = event => {
    this.setState({username: event.target.value})
  }

  hitPassword = event => {
    this.setState({password: event.target.value})
  }

  onError = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onsubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onError(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="loginPage">
          <div className="mainComponent">
            <div className="loginBox">
              <img
                src="https://res.cloudinary.com/suraj4/image/upload/v1639816944/Frame_274_1_v8tqf5.png"
                alt="website logo"
                className="loginLogo"
              />
              <h1 className="loginHead">Tasty Kitchens</h1>
              <h1 className="loginText">Login</h1>
              <form className="formContainer">
                <label htmlFor="username" className="username">
                  Username
                </label>
                <input
                  type="textBox"
                  id="username"
                  className="inputContainer"
                  onChange={this.hitUsername}
                />
                <label htmlFor="password" className="username">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="inputContainer"
                  onChange={this.hitPassword}
                />
                <button type="submit" className="but" onClick={this.onsubmit}>
                  Login
                </button>
              </form>
              {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/suraj4/image/upload/v1639229817/Rectangle_1456_ryd4o2.png"
            alt="website login"
            className="loginImg"
          />
        </div>
      </>
    )
  }
}

export default Login
