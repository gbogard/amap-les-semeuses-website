import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
          AMAP Les Semeuses. 2019 Tous droits réservés.
          <br />
          <Link to="/a-propos">À propos</Link><br />
          Site internet par <a href="https://guillaumebogard.dev">Guillaume Bogard</a>
      </footer>
    )
  }
}

export default Footer
