import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'

export const BlogPageTemplate = ({posts, numPages, currentPage}) => {
    const prevPage = currentPage > 1 ? `/blog${currentPage === 2 ? '' : `/${currentPage - 1}`}` : null;
    const nextPage = currentPage < numPages ? `/blog/${currentPage + 1}` : null;

    return (
        <Fragment>
            <div className="blog-title">
                <h1 className="container has-text-weight-bold is-size-1">
                    Dernières nouvelles
                </h1>
            </div>
            <div className="container">
                {posts && posts.map(({node: post}) => (
                    <article key={post.id} className="box media blog-page-item">
                        {post.frontmatter.featuredimage && (
                            <figure className="media-left">
                                <p className="image is-128x128">
                                    <img alt={post.frontmatter.title}
                                         src={post.frontmatter.featuredimage.childImageSharp.fluid.src}/>
                                </p>
                            </figure>
                        )}
                        <div className="media-content">
                            <p className="post-meta">
                                <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                                    {post.frontmatter.title}
                                </Link>
                                <br/>
                                <span className="subtitle is-size-5 is-block">{post.frontmatter.date}</span>
                                <p>
                                    {post.excerpt}
                                    <br/>
                                    <br/>
                                    <Link className="button" to={post.fields.slug}>
                                        Lire plus →
                                    </Link>
                                </p>
                            </p>
                        </div>
                    </article>
                ))}
                <br />
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    { prevPage && <Link to={prevPage} className="pagination-previous">Previous</Link> }
                    { nextPage && <Link to={nextPage} className="pagination-next">Next page</Link> }
                    <ul className="pagination-list">
                        <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
                        <li><span className="pagination-ellipsis">&hellip;</span></li>
                        { prevPage && <li><Link to={prevPage} className="pagination-link">{currentPage - 1}</Link></li> }
                        <li><span className="pagination-link is-current" aria-current="page">{currentPage}</span></li>
                        { nextPage && <li><Link to={nextPage} className="pagination-link">{currentPage + 1}</Link></li> }
                        <li><span className="pagination-ellipsis">&hellip;</span></li>
                        <li><Link to={`/blog/${numPages}`} className="pagination-link">{numPages}</Link></li>
                    </ul>
                </nav>
                <br />
                <br />
            </div>
        </Fragment>
    );
};

BlogPageTemplate.propTypes = {
    posts: PropTypes.array,
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
};

const BlogPage = ({data, pageContext}) => {
    const {allMarkdownRemark: {edges: posts}} = data;

    return (
        <Layout>
            <BlogPageTemplate posts={posts} currentPage={pageContext.currentPage} numPages={pageContext.numPages} />
        </Layout>
    )
}

BlogPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.object,
    }),
}

export default BlogPage;

export const pageQuery = graphql`
  query BlogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 256, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
