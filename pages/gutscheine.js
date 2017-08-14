/**
 * The index page uses a layout page that pulls in header and footer components
 */
const Zanox = require('zanox-api')

import Link from 'next/link'
import React from 'react'
import Page from '../components/page'
import Layout from '../components/layout'
import {Row, Col, Card, Carousel} from 'antd'
import ImgCard from '../modules/imgcard.js'
import SmCard from '../modules/smcard.js'
import GridCard from '../modules/gridcard.js'
import 'isomorphic-fetch'
import AsyncData from '../components/incentives-data.js'
import Slider from '../modules/slider.js'
import BasicCard from '../modules/basiccard'
import Router from 'next/router';

export default class extends Page {

  /* eslint no-undefined: "error" */
  static async getInitialProps({req}) {
    // Inherit standard props from the Page (i.e. with session data)
    let props = await super.getInitialProps({
      req
    })

    // If running on server, perform Async call
    if (typeof window === 'undefined') {
      props.incentives = await AsyncData.getData()
      console.log(props.incentives[50].program.$.split(' ')[0], 'program name do not delete')
      console.log(props.incentives[0], 'second')
    }

    return props
  }

  // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props)
    this.state = {
      incentives: props.incentives //|| []
    };

    this.storeIncentives(props.incentives);
  }

  storeIncentives(incentives) {
    incentives || (incentives = []);
    process.browser && (window.incentives = incentives);
  }

  navigateToIncentivePage(id) {
    Router.push(`/incentive?id=${id}`);
  }

  // This is called after rendering, only on the client (not the server)
  // This allows us to render the page on the client without delaying rendering,
  // then load the data fetched via an async call in when we have it.
  async componentDidMount() {
    const incentives = await AsyncData.getData();
    this.setState({ incentives });
  }

  render() {
    return (
      <Layout session={this.props.session}>
        <div>this is</div>
      </Layout>
    )
  }

}
