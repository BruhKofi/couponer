import { Card, Col, Row } from 'antd';

const GridCard = props => {
  return (
    <div style={ { background: '#ECECEC', padding: '5px' } }>
      <Row gutter={ 16 }>
        <Col span={ 8 }>
        <Card title="Card title" bordered={ true }>Card content</Card>
        </Col>
        <Col span={ 8 }>
        <Card title="Card title" bordered={ false }>Card content</Card>
        </Col>
        <Col span={ 8 }>
        <Card title="Card title" bordered={ false }>Card content</Card>
        </Col>
      </Row>
    </div>
  )
}

export default GridCard
