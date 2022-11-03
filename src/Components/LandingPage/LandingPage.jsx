import React from "react";
import { Link } from "react-router-dom";
import "./Styles.css";

function LandingPage() {
  return (
    <>
      {/* <Nav /> */}
      <div>
        <img className='landingPage-img' src="https://images.unsplash.com/photo-1543489822-c49534f3271f" alt="Hotel" />
        <div className='landingPage-welcome'>
          <img className='landingPage-welcome-img' src="https://images.unsplash.com/photo-1512686096451-a15c19314d59" alt="" />
          <main className='landingPage-welcome-body'>
            <h1 className='landingpage-title'>
              Welcome to
              <br />
              World Developers
            </h1>
            <p>
            Here you can find a wide variety of hotels around the country that offer rooms with different services and you can also search for IT events that are published by each hotel.
            </p>
            <p>
            Each hotel provides a service oriented towards software developers. You will find all the amenities you need. You will be surrounded by the IT world
            </p>

            <Link to="/home">
              <button className='landingpage-btn'>See hotels</button>
            </Link>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default LandingPage;
