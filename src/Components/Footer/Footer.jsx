import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';

function Footer () {
  return (
    <footer className='text-white pt-5 p-4 pb-1 footer-container'>
      <div className='container'>
        <h1>World Developers</h1>
        <h6 className='mb-4'>Work & Relax</h6>
        <nav className='row g-2 g-sm-5 pb-sm-5'>
          <div className='col-sm-6'>
            <Link to='/' className='text-reset'>Home</Link>
            <br />
            <Link to='/home' className='text-reset'>Hotels</Link>
            <br />
            <Link to='' className='text-reset'>Events</Link>
            <br />
            <Link to='' className='text-reset'>Gallery</Link>
            <br />
            <Link to='' className='text-reset'>FAQ</Link>
            <br />
            <Link to='' className='text-reset'>About us</Link>
          </div>
          <div className='col-sm-6 py-4 py-sm-0 ps-md-5'>
            <ul className='list-unstyled'>
              <li className='mb-2'>CONTACT</li>
              <li>World Developers, Work & Relax</li>
              <li className='mb-2'>Calle 123 Arg/Col</li>
              <li>worlddevd@gmail.com</li>
              <li>+54 9 5436286345</li>
            </ul>
          </div>
        </nav>

        <div className='footer-bottom'>
          <p className='text-center'>
            &copy; {new Date().getFullYear()} - World Developers, Work & Relax. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;