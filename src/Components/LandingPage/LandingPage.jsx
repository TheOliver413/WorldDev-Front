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
              World developers is a blah blah blah etc Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Eget adipiscing facilisis
              convallis lectus quis sed. Et libero, tincidunt dolor placerat magna
              rhoncus morbi nibh accumsan. Ut tortor eget eu cum orci, adipiscing
              sollicitudin lacus.
              <br />
              Copy paste: Su atención, confort, ubicación y su excelente relación
              precio/calidad lo convierte en la elección ideal para viajes de
              negocios, culturales, recreativos o para participar de congresos y
              jornadas.
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
