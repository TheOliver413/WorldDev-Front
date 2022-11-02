import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css';

import sendEmail from '../emails/sendOfferts';
function Footer() {

  function submitHandler(e) {
    e.preventDefault();
    let correo = e.target.correo.value;
    sendEmail(correo);
    document.getElementById("correo").value = "";
  }

  return (
    <footer>
      <div class="py-6 bg-gray">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <h6 class="fw-bold text-uppercase text-heading mb-3">about World Developers</h6>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aperiam quis quam
                quibusdam dolores deleniti placeat impedit illo vitae cumque quo consequatur nulla vero
                velit cum aliquam debitis, optio reprehenderit!
              </p>
              <ul class="list-inline">
                <li class="list-inline-item">
                  <Link to='' className='text-reset'><i class="bi bi-youtube"></i></Link>
                </li>

                <li class="list-inline-item">
                  <Link to='' className='text-reset'><i class="bi bi-twitter"></i></Link>
                </li>

                <li class="list-inline-item">
                  <Link to='' className='text-reset'><i class="bi bi-facebook"></i></Link>
                </li>

                <li class="list-inline-item">
                  <Link to='' className='text-reset'><i class="bi bi-instagram"></i></Link>
                </li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-6 mb-5 mb-lg-0">
              <h6 class="fw-bold text-uppercase text-heading mb-3">Contact</h6>
              <ul class="list-unstyled">
                <li className='text-para'>World Developers.</li>
                <li className='text-para'>worlddevd@gmail.com</li>
                <li className='text-para'>+54 5436286345.</li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-6 mb-5 mb-lg-0 ">
              <h6 class="fw-bold text-uppercase text-heading mb-3">Pages</h6>
              <ul class="list-unstyled">
              <li><Link to='/' className='text-para'><i class="bi bi-house-door"></i> Home</Link></li>
                <li><Link to='/home' className='text-para'><i class="bi bi-building"></i> Hotels</Link></li>
                <li><Link to='/home/Events' className='text-para'><i class="bi bi-calendar-check"></i> Evenst</Link></li>
                <li><Link to='/about' className='text-para'><i class="bi bi-info-circle"></i> About Us</Link> </li>
              </ul>
            </div>



            <div class="col-lg-4">
              <h6 class="fw-bold text-uppercase text-heading mb-3">Daily Offers & Discon</h6>
              <p class="mb-3">Receive Our Offers In Your Email</p>
              <form onSubmit={submitHandler}>
                <div class="input-group mb-3">
                  <input type="email" name='correo' id='correo' class="form-control bg-transparent border-dark border-end-0s" placeholder="Your Email"
                    aria-label="Your Email" />
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-dark border-dark border-start-0" type="submit"><i
                      class="bi bi-cursor-fill text-lg"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="py-4 bg-dark-gray text-gray-300">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              <p class="text-sm mb-md-0">&copy; - World Developers, Work & Relax. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;