import React from 'react' // React import here just to keep 'xo' linter happy
import Layout from '../components/layout'
const Content = (props) => (
  <div>
    <h1>{ props.url.query.title }</h1>
    <p>This is the blog post content.</p>
  </div>
)

export default (props) => (
  <Layout session={ this.props.session }>
    <Content url={ props.url } />
  </Layout>
)
