import React from 'react'
import { Link } from 'gatsby'

import Footer from './Footer'
import Header from './Header'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
        
    return (
      <>
        <Header></Header>
        <div>
          {children}
        </div>
        <Footer></Footer>
      </>
    )
  }
}

export default Layout
