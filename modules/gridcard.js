import { Card, Col, Row } from 'antd'
import BasicCard from '../modules/basiccard.js'

const GridCard = props => {
  return (
    <div style={ { background: '#e9e9e9', padding: '0px' } }>
      <Row gutter={ 30 }>
        <Col span={ 8 } lg={ 8 } md={ 24 } sm={ 24 } xs={ 24 }> Gutschein
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        </Col>
        <Col span={ 8 } lg={ 8 } md={ 24 } sm={ 24 } xs={ 24 }> Rabbate
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        </Col>
        <Col span={ 8 } lg={ 8 } md={ 24 } sm={ 24 } xs={ 24 }> Exclusives
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        <BasicCard/>
        </Col>
      </Row>
    </div>
  )
}

export default GridCard
