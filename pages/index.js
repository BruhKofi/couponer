/**
 * The index page uses a layout page that pulls in header and footer components
 */
import Link from 'next/link'
import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import ImgCard from '../modules/imgcard.js'
import { Row, Col, Card, Carousel } from 'antd';

const urlmain = 'instagram.com';
export default class extends Page {
  render() {
    return (
      <Layout session={ this.props.session }>
        <Row type='flex' gutter={ 24 } align='middle'>
          <Col lg={ 18 } md={ 24 } sm={ 24 } xs= { 24 }>
          <Carousel autoplay style={{ width: 'auto', height: 'auto'}}>
            <div><img alt="example" src="http://via.placeholder.com/1200x370" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x370" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x370" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x370" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x370" /></div>
          </Carousel>
          </Col>
          <Col lg={ 6 } md={ 24 }>
          <Row gutter={ 24 } justify="space-around">
            <Col lg={ 24 } md={ 12 }>
            <Card loading title="Card title" style={{ width: '100%' }}>
            Whatever content
          </Card>
            </Col>
            <Col lg={ 24 } md={ 12 }>
            <Card loading title="Card title" style={{ width: '100%' }}>
            Whatever content
          </Card>
            </Col>
          </Row>
          </Col>
          <Col lg={ 12 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
          <Col lg={ 12 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
          <Col lg={ 24 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={{ width: '100%' }}>
          Whatever content
        </Card>
          </Col>
        </Row>
      </Layout>
    )
  }

}
