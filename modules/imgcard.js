import {Card} from 'antd'

const ImgCard = props => {
  return (
    <Card bordered style={{width: 360, height: 500, background: '#ffffff'}} bodyStyle={{padding: 0}}>
      <div className="custom-image">
        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>
      </div>
      <div className="custom-card">
        <h3>Europe Street beat</h3>
        <p>{props.url}</p>
      </div>
    </Card>
  )
}

export default ImgCard
