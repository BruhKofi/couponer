import {Card, Avatar, Button} from 'antd'
import Btn from '../modules/button.js'

const SmCard = props => {
  return (
    <div>
      <Card style={{width: '100%', height: 'auto'}} bordered bodyStyle={{padding: 0}}>
        <a href="">
          <img src="http://via.placeholder.com/1200x700" style={{width: '100%', height: 'auto'}} alt=""/>
        </a>
        <h3 style={{padding: 15}}>{ props.description }</h3>
        <Btn/>
      </Card>
    </div>
  )
}

export default SmCard
