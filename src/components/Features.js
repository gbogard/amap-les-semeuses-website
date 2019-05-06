import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-4">
        <section className="section has-text-centered">
          <div style={{ width: '150px', display: 'inline-block' }}>
              <PreviewCompatibleImage imageInfo={item} />
          </div>
          <div>
              <h4 className="title is-4">{item.title}</h4>
              <p>{item.text}</p>
          </div>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
