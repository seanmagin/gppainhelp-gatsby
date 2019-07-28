import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query BioDataQuery {
            dataJson {
              name
              profilePic
              bio
            }
          }
        `}
        render={data => (
          <div
            style={{
              display: 'flex',
              marginBottom: rhythm(2.5),
            }}
          >
            <img
              src={data.dataJson.profilePic}
              alt={data.dataJson.name}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
            <div dangerouslySetInnerHTML={{ __html: data.dataJson.bio }} />
          </div>
        )}
      />
    )
  }
}

export default Bio
