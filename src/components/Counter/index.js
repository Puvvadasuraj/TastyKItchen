import {Component} from 'react'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import './index.css'

class Counter extends Component {
  state = {
    activeCount: 1,
  }

  increaseActive = () => {
    const {activeCount} = this.state
    const updatedState = activeCount + 1
    const {changeOption} = this.props

    if (updatedState <= 4) {
      this.setState({activeCount: updatedState})
      changeOption(updatedState)
    }
  }

  decreaseActive = () => {
    const {activeCount} = this.state
    const updatedState = activeCount - 1
    const {changeOption} = this.props
    if (activeCount > 1) {
      this.setState({activeCount: updatedState})
      changeOption(updatedState)
    }
  }

  render() {
    const {activeCount} = this.state
    return (
      <div className="counterContainer">
        <button
          type="button"
          onClick={this.decreaseActive}
          testid="pagination-left-button"
          className="leftArrow"
        >
          <AiOutlineLeft className="leftArrow" />
        </button>
        <div className="pageContainer">
          <p className="pageNo" testid="active-page-number">
            {activeCount}
          </p>
          of 4
        </div>
        <button
          type="button"
          onClick={this.increaseActive}
          testid="pagination-right-button"
          className="leftArrow"
        >
          <AiOutlineRight className="leftArrow" />
        </button>
      </div>
    )
  }
}

export default Counter
