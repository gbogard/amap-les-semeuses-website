import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import Map from '../components/Map'

const withBackgroundImage = image =>
    ({backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`});

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  info,
  reasons,
  location: { coordinates: [lng, lat] },
}) => (
    <div>
        <div className="jumbo" style={withBackgroundImage(image)}>
            <div>
                <div>
                    <h2>{heading}</h2>
                    <p>{subheading}</p>
                </div>
            </div>
        </div>
        <div className="container section has-text-centered">
            <h3 className="title is-3">Pourquoi l'AMAP des Semeuses ?</h3>
            <Features gridItems={reasons.items} />
            <Link to={reasons.link}>En savoir plus</Link>
        </div>
        <section className="section has-background-light">
            <div className="container">
                <h3 className="title is-3">Dernières nouvelles</h3>
                <BlogRoll />
            </div>
        </section>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h3 className="title is-3">Informations</h3>
                    <p>
                        {info.split('\n').map(t => <div key={t}>{t}</div>)} 
                    </p>
                </div>
            </div>
        </section>
        <Map lat={lat} lng={lng} />
    </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  subheading: PropTypes.string,
  info: PropTypes.string,
  reasons: PropTypes.shape({
    items: PropTypes.array,
    link: PropTypes.string,
  }),
  location: PropTypes.shape({
    coordinates: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        reasons={frontmatter.reasons}
        info={frontmatter.info}
        location={JSON.parse(frontmatter.location || '{}')}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        info
        location
        reasons {
          items {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text,
            title
          }
          link
        }
      }
    }
  }
`
