import './index.css'

const SliderItem = prop => {
  const {imageItem} = prop
  const {imageUrl} = imageItem
  return (
    <div>
      <img src={imageUrl} alt="offer" className="sliderImage" />
    </div>
  )
}

export default SliderItem
