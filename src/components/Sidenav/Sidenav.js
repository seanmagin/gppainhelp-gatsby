import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import get from 'lodash/get'

import style from './Sidenav.module.css'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }, limit: 1) {
          edges {
            node {
              # frontmatter {
              #   title
              # }
              excerpt
            }
          }
        }
      }
    `}
    render={data => (
      <nav>
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const title = node.excerpt

            return { title }
          })}
        </div>
      </nav>
    )}
  />
)

// render() {
//   const posts = get(this, 'data.allMarkdownRemark.edges')

//   return (
//     <nav>
//       <ul>
//         {/* {posts.map(({ node }) => {
//           const title = get(node, 'frontmatter.title') || node.fields.slug
//           return (
//             <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
//               {title}
//             </Link>
//           )
//         })} */}
//       </ul>
//     </nav>
//   )
// }

// export const query = graphql`
//   query {
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `
// export default Sidenav
