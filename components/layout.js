import React from 'react'
import Header from './header'
import Footer from './footer'
import {Layout} from 'antd'

const {Content} = Layout

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired
    }
  }

  render() {
    return (
      <Layout>
        <Header session={this.props.session}/>
        <Content style={{padding: '15%', background: '#e9e9e9'}}>
          <div style={{background: '#e9e9e9', minHeight: 280}}>
            { this.props.children }
          </div>
        </Content>
        <Footer/>
      </Layout>
    )
  }

}
