import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';

function Footer () {
  return (
    <div>
      <footer className='text-white py-4  footer-container '>
        <div className='container px-4'>
          <nav className='row g-6'>
            <div className='col-md-7 col-sm-6'>
              <ul className='list-unstyled mb-4'>
                <h1>World Developers</h1>
                <h6>Work & Relax</h6>
              </ul>
              <Link to='/' className='text-reset' >Home</Link>
              <br />
              <Link to='/home' className='text-reset' >Hotels</Link>
              <br />
              <Link to='' className='text-reset' >Events</Link>
              <br />
              <Link to='' className='text-reset' >Gallery</Link>
              <br />
              <Link to='' className='text-reset' >FAQ</Link>
              <br />
              <Link to='' className='text-reset' >About us</Link>
            </div>

            <ul className='col-12 col-md-5 list-unstyled py-5'>
              <li className='font-weight-bold mb-2'>CONTACT</li>
              <li>World Developers, Work & Relax <br /> Calle 123 Arg/Col</li>
              <br />
              <li>worlddevd@gmail.com</li>
              <li>+54 9 5436286345</li>
            </ul>
          </nav>

          <div className='footer-bottom py-4 '>
            <p className='text-center'>
              &copy;{new Date().getFullYear()} World Developers, Work & Relax - All Rights Reserved
            </p>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer;