/* global window */
import Link from 'next/link'
import React from 'react'
import Session from './session'
import { Menu as AntMenu, Icon } from 'antd'

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired
    }
  }

  async handleSubmit(event) {
    event.preventDefault()

    const session = new Session()
    await session.signout()

    // @FIXME next/router not working reliably  so using window.location
    window.location = '/'
  }

  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const session = this.props.session || null

    let loginMessage = <p>
                         You are not logged in.
                         <Link prefetch href="/auth/signin"><a>Sign in</a></Link>
                       </p>

    if (session.user) {
      loginMessage = (
        <form id="signout" method="post" action="/auth/signout" onSubmit={ this.handleSubmit }>
          <input name="_csrf" type="hidden" value={ session.csrfToken } />
          <p>
            <Link prefetch href="/"><a className="home">Home</a></Link>Logged in as <strong><Link prefetch href="/auth/signin"><a>{ session.user.name || session.user.email }</a></Link></strong>
            <button type="submit">Sign out</button>
          </p>
        </form>
      )
    }

    return (
      <AntMenu onClick={ this.handleClick } selectedKeys={ [this.state.current] } mode="horizontal">
        <AntMenu.Item>
          <Link prefetch href="/"><a className="home">Home</a></Link>
        </AntMenu.Item>
        <AntMenu.Item>
          <Link prefetch href="helloworld"><a className="home">Coupons</a></Link>
        </AntMenu.Item>
        <AntMenu.Item>
          <Link prefetch href="css"><a className="home">CSS</a></Link>
        </AntMenu.Item>
        { loginMessage }
      </AntMenu>
    )
  }

}
