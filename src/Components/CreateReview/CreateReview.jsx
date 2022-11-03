import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailHotel } from "../../redux/action/action";
import { postReviewHotel } from "../../redux/action/reviewAction";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify'

function CreateReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const { detailHotel } = useSelector((state) => state.reducerHotel);
  const { /* error, */ success, loading } = useSelector(
    (state) => state.reducerReview
  );
  const { user } = useAuth();

  const ratingArr = [];
  for (let i = 1; i <= rating; i++) ratingArr.push(i);

  const handleRatingChange = (e) => setRating(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) return toast.error('You must log in to write a review', { position: 'bottom-right' })
    dispatch(
      postReviewHotel({
        idHotel: id,
        name: user.displayName || user.email,
        rating,
        comment,
        user: user.uid,
      })
    );
  };

  useEffect(() => {
    dispatch(getDetailHotel(id));
  }, [dispatch, id]);

  return (
    <div
      className="w-75 mx-auto my-5 card p-2 p-md-3"
      style={{ maxWidth: "600px" }}
    >
      {!success ? (
        <form onSubmit={handleSubmitReview} className="card-body">
          <h2>
            Write a review about&nbsp;
            {detailHotel.name ? detailHotel.name : "the hotel"}
          </h2>
          <h4 className="mt-4">Rating</h4>
          <input
            onChange={handleRatingChange}
            value={rating}
            defaultValue="1"
            type="range"
            className="form-range"
            min="1"
            max="5"
          />
          <h4>{ratingArr.map(() => "★")}</h4>

          <h4 className="mt-4">Review</h4>
          <textarea
            onChange={handleCommentChange}
            value={comment}
            required
            className="w-100 form-control"
            placeholder="This hotel is wonderful!"
          />

          {!loading ? (
            <button className="btn btn-primary w-100 mt-4" type="submit">
              Submit
            </button>
          ) : (
            <button
              className="btn btn-primary w-100 mt-4"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          )}
        </form>
      ) : (
        <div className="d-grid gap-4 card-body">
          <h2>Review submitted</h2>
          <p>Thank you for choosing us.</p>
          <button
            onClick={() => navigate("/home")}
            className="btn btn-primary w-100 mt-2"
            type="button"
          >
            Go home
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateReview;
