import {Carousel} from 'antd'
import Btn from '../modules/button.js'

const Slider = props => {
  return (
    <div style={{paddingBottom: '0px'}}>
      <Carousel autoplay>
        <div><img alt="example" src={props.sliderImage} style={{width: '100%', height: 'auto'}}/></div>
      </Carousel>
    </div>
  )
}

export default Slider
