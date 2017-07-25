/**
 * The index page uses a layout page that pulls in header and footer components
 */
const Zanox = require("zanox-api");
import Link from 'next/link'
import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import ImgCard from '../modules/imgcard.js'
import { Row, Col, Card, Carousel } from 'antd';
import SmCard from '../modules/smcard.1.js'
import "isomorphic-fetch";
import AsyncData from '../components/incentives-data.js'

const config = require('../config.js')
const connectId = config.connectId;
const secretKey = config.secretKey;
const adspace = config.adspace;
const zanox = new Zanox(connectId, secretKey);

const urlmain = 'instagram.com';
export default class extends Page {

  /*  static async getInitialProps() {
    function zxpromise() {
      return new Promise(function(resolve, reject) {
        return zanox.incentives({
          region: "DE",
          //items: 5
        }, function(err, result) {
          if (err != null) {
            reject(err);
          }
          //console.log(result, "before return");
          resolve(result);
        //console.log(result, "after return");
        });
      });
    }

    const res = await zxpromise()
    //console.log(res, 'rest')
    //console.log(res.incentiveItems.incentiveItem[0], "json");

    return {
      items: res.incentiveItems.incentiveItem
    };
  }  */



  /* eslint no-undefined: "error" */
  static async getInitialProps({req}) {
    // Inherit standard props from the Page (i.e. with session data)
    let props = await super.getInitialProps({
      req
    })

    // If running on server, perform Async call
    if (typeof window === 'undefined') {
      props.items = await AsyncData.getData()
    }

    return props
  }

  // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props)
    this.state = {
      items: props.items || []
    }
  }





  // This is called after rendering, only on the client (not the server)
  // This allows us to render the page on the client without delaying rendering,
  // then load the data fetched via an async call in when we have it.
  async componentDidMount() {
    console.log(items, "items");
    this.setState({
      items: await AsyncData.getData()
    })
  }




  render() {
    return (
      <Layout session={ this.props.session }>
        <Row type='flex' gutter={ 24 } align='middle'>
          <Col lg={ 18 } md={ 24 } sm={ 24 } xs={ 24 }>
          <Carousel autoplay style={ { width: '100%', height: 'auto' } }>
            <div><img alt="example" src="http://via.placeholder.com/1200x450" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x450" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x450" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x450" /></div>
            <div><img alt="example" src="http://via.placeholder.com/1200x450" /></div>
          </Carousel>
            <br />
          </Col>
          <Col lg={ 6 } md={ 24 } sm={ 24 } xs={ 24 }>
          <Row gutter={ 24 } justify="space-around">
            { this.state.items.slice(0, 2).map((item, i) => (
                <Col lg={ 24 } md={ 12 }>
                <div key={ i }>
                  <SmCard title={ item.name } />
                  <br />
                </div>
                </Col>
              )) }
          </Row>
          </Col>
          <Col lg={ 12 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
          <Col lg={ 12 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
          <Col lg={ 24 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
          <Col lg={ 8 } md={ 24 }>
          <Card loading title="Card title" style={ { width: '100%' } }>
            Whatever content
          </Card>
          </Col>
        </Row>
      </Layout>
    )
  }

}
