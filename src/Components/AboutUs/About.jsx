import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Styles.css"

const AboutUs = () => {
  const hotelDetail = useSelector((state) => state.reducerHotel.detailHotel);
  const { image } = hotelDetail


  return (
    <div class="container">
    <div class="container marketing">
      <div class="position-relative  text-center bg-light">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">About Us</h1>
          <p class="lead fw-normal">We are a group of developers that seeks to provide relaxation times full of conferences with great programmers in the industry, where you can actively participate in addition to generating new links and future projects.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 border rounded">
          <img
            src= 'https://th.bing.com/th/id/R.db2477c198d3e797687e377cf24a5b73?rik=nqbukdmRfWI3iw&pid=ImgRaw&r=0'
            alt="" width='100%' object-fit= 'cover' height="200"  class="imagen"/>
          <h2>Hotels</h2>
          <p>World developers offers you a wide variety of hotels in the best destinations so that you can enjoy an unforgettable vacation while you work.</p>
          <p><a class="btn btn-outline-info" href="/home">View details</a></p>
        </div>

        <div class="col-lg-4 border rounded">
          <img
            src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/384792512.jpg?k=eb804905e3f289540b7d8c74be4dab19d54edce4fc70ac4d2b8b8f41a8498715&o=&hp=1"
            alt="" width='100%' object-fit= 'cover' height="200" class="imagen"/>
          <h2>Rooms</h2>
          <p>If you want to live a stay with the best services and comforts, the rooms of our different hotels are the ideal option.
          </p>
          <p><a class="btn btn-outline-info" href="/hotel/room/57a97b5b-60ca-4bdd-ada1-36fb9d762746">View details &raquo;</a></p>
        </div>

        <div class="col-lg-4 border rounded">
          <img
            src="https://res.cloudinary.com/dyyoavgq5/image/upload/v1667235490/hotels/q0rwxbri9nr61a7axied.jpg"
            alt="" width='100%' object-fit= 'cover' height="200" class="imagen"/>
          <h2>Events</h2>
          <p>In an industry that moves as fast as development, it's a challenge to stay on top of what's new. Come and participate in conferences and unique events.
          </p>
          <p><a class="btn btn-outline-info" href="/home/Events">View details &raquo;</a></p>
        </div>
      </div>

      <hr class="featurette-divider"/>

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Relax time. <span class="text-muted"> Focused on the concept of Med & Relax. </span>
          </h2>
          <p class="lead">At Tiempo de Relax we offer a carefully thought out program of activities. In our IT world of remote work, they usually cause contractures from bad postures in addition to the stress of permanently carrying out new knowledge. That is why we devised programs aimed at providing you with a complete relaxation experience, including body, mind and spirit.</p>
        </div>
        <div class="col-md-5">
          {/* <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
            height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg> */}
          <img src='https://static.wixstatic.com/media/11062b_b277c9f0c9184f83abc87a3ab3df2454~mv2.jpg/v1/crop/x_2572,y_0,w_3450,h_4015/fill/w_405,h_471,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Relajaci%C3%B3n.jpg'></img>
        </div>
      </div>

      <hr class="featurette-divider"/>

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">Technology conferences. <span class="text-muted">Participate, inform yourself and develop.</span>
          </h2>
          <p class="lead">Attending conferences is an excellent way to find out about the latest technological advances, new versions, updates, changes, new practices, tips and advice. And although attending an event in person has additional benefits such as the opportunity to ask questions of industry leaders, or meet more people with similar interests to yours, not all of us have the opportunity to attend these conferences.</p>
        </div>
        <div class="col-md-5 order-md-1">
          {/* <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
            height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg> */}
          <img src= 'https://th.bing.com/th/id/R.c939236b78ddcec100fa8c139d262d6d?rik=7bz%2fsP15nRA8ZA&pid=ImgRaw&r=0&sres=1&sresct=1' width="500"
            height="500" ></img>
        </div>
      </div>

      <hr class="featurette-divider"/>

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Our heated pools.<span class="text-muted">Cheer up when you relax.</span></h2>
          <p class="lead">Holidays in our hotels are really relaxing, even during the first days of spring, when the weather is still very uncertain. Some have an aquatic area with covered and heated pools where you can share unforgettable moments with the whole family and relax after a day full of meetings with powers of the IT world.</p>
        </div>
        <div class="col-md-5">
          {/* <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
            height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
            preserveAspectRatio="xMidYMid slice" focusable="false">
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg> */}
          <img src= 'https://static.wixstatic.com/media/85c85c_7c6bd050d3ba4d0198c40986d7dde323~mv2.jpg/v1/fill/w_783,h_522,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/85c85c_7c6bd050d3ba4d0198c40986d7dde323~mv2.jpg' width="500"
            height="500"></img>

        </div>
      </div>

      <hr class="featurette-divider"/>

    </div>
  </div>
  );
};

export default AboutUs;

