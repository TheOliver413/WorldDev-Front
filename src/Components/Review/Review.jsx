import React from "react";

function Review({ name, rating, comment }) {
  const ratingArr = [];
  for (let i = 1; i <= rating; i++) ratingArr.push(i);

  return (
    <div className="mx-auto my-5 card p-2 p-md-3">
      <div className="card-body">
        <h4>{name}</h4>
        {/* <h4>Rating: {rating}</h4> */}
        <h5>{ratingArr.map(() => "★")}</h5>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Review;
