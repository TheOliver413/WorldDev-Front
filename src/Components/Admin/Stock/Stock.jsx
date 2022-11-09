import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBooksByHotel,
  filterBooksByStatus,
  getBooks,
  orderBooksByDate,
  orderBooksByHotel,
  updateStatusBooking,
} from "../../../redux/action/actionStripe";
import { toast } from "react-toastify";
import { getHotels } from "../../../redux/action/action";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from "../../../redux/action/actionAuth";
import "./Styles.css";

const Stock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const datos = useSelector((state) => state.reducerAuth.users);

  useEffect(() => {
    if (user && user.hasOwnProperty("uid")) {
      dispatch(getDetailUser(user.uid));
    }
  }, [dispatch, user]);

  const { allBooks } = useSelector((state) => state.reducerStripe);
  const hotels = useSelector((state) => state.reducerHotel.allHotels);
  const [refreshBooks, setRefreshBooks] = useState([]);
  const [, setOrder] = useState("");

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getHotels());
  }, [dispatch, refreshBooks]);

  function filterBooks() {
    let hotelFinded = hotels?.find((e) => e.name === datos.hotel);
    let booksFiltered = allBooks?.filter((e) => e.idHotel === hotelFinded?.id);
    return booksFiltered;
  }

  const handleStatus = (payload) => {
    let confirmation = window.confirm(
      "Are you sure to cancel the reservation?"
    );
    if (confirmation) {
      dispatch(updateStatusBooking(payload));
      setRefreshBooks([]);
      // console.log("eeeeee", payload);
      toast.success("Reservation cancelled", { position: "bottom-right" });
    } else {
      toast.error("Reservation not canceled", { position: "bottom-right" });
    }
  };

  const handleFilterByHotel = (e) => {
    e.preventDefault();
    dispatch(filterBooksByHotel(e.target.value));
    console.log("filter hotel", allBooks);
  };

  const handleFilterByStatus = (e) => {
    e.preventDefault();
    dispatch(filterBooksByStatus(e.target.value));
  };

  const handleOrderByHotel = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(orderBooksByHotel(e.target.value));
    console.log("order hotel", allBooks);
  };

  const handleOrderByDate = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(orderBooksByDate(e.target.value));
    console.log("order date", allBooks);
  };

  return (
    <>
      {datos.rol === "superAdmin" || datos.rol === "admin" ? (
        <div className="container">
          <div className="row">
            <div className="row g-2">
              {datos && datos.rol === "superAdmin" ? (
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={(e) => handleFilterByHotel(e)}
                    >
                      {hotels &&
                        hotels
                          .sort((a, b) => {
                            if (
                              a.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase() >
                              b.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                            )
                              return 1;
                            if (
                              a.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase() <
                              b.name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .toLowerCase()
                            )
                              return -1;
                            return 0;
                          })
                          .map((e) => {
                            return (
                              <option key={e.id} value={e.name}>
                                {e.name}
                              </option>
                            );
                          })}
                    </select>
                    <label for="floatingSelectGrid">Filter by Hotel</label>
                  </div>
                </div>
              ) : (
                <option disabled value={datos.id}>
                  {datos.hotel}
                </option>
              )}

              <div className="col-md">
                <div className="form-floating">
                  <select
                    className="form-select"
                    onChange={(e) => handleFilterByStatus(e)}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <label for="floatingSelectGrid">Filter by Status</label>
                </div>
              </div>
            </div>

            {datos && datos.rol === "superAdmin" ? (
              <div className="row g-2">
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={handleOrderByHotel}
                    >
                      <option value="a-z">A-Z</option>
                      <option value="z-a">Z-A</option>
                    </select>
                    <label for="floatingSelectGrid">Sort by Hotel</label>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      onChange={handleOrderByDate}
                    >
                      <option hidden>By Date</option>
                      <option value="asc">Check Asc</option>
                      <option value="desc">Check Desc</option>
                    </select>
                    <label for="floatingSelectGrid">Sort by Day</label>
                  </div>
                </div>
              </div>
            ) : (
              <div hidden />
            )}
            <button
              type="button"
              className="btn btn-outline-secondary w-auto mx-1 my-3"
              onClick={() => dispatch(getBooks())}
            >
              Clear filters
            </button>

            <h2 className="mt-1 p-0">Bookings</h2>
            <table
              className="table table-striped"
              style={{ maxWidth: "1500px", marginInline: "auto" }}
            >
              <thead>
                <tr>
                  <th className="size" scope="col">
                    Hotels
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col">Rooms</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Check-in</th>
                  <th scope="col">Check-out</th>
                  <th scope="col">Stock balance</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cancel</th>
                </tr>
              </thead>
              {datos && datos.rol === "superAdmin" ? (
                <tbody className="table-group-divider">
                  {allBooks.length ? (
                    allBooks.map((b, i) => (
                      <tr key={i}>
                        <td>{`${b.hotel}, ${b.address}`}</td>
                        <td>{b.date}</td>
                        <td>{b.name}</td>
                        <td>USD {b.price}</td>
                        <td>{b.cartQuantity}</td>
                        <td>{b.checkIn}</td>
                        <td>{b.checkOut}</td>
                        <td>{b.newStock}</td>
                        <td>{b.status}</td>
                        <td>
                          <button
                            id={b.id}
                            onClick={() =>
                              handleStatus({
                                id: b.id,
                                user: b.user,
                                status: "cancelled",
                              })
                            }
                            className="btn btn-outline-danger"
                            type="button"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div
                      style={{
                        with: "100%",
                        height: "250px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1>No reservations found</h1>
                    </div>
                  )}
                </tbody>
              ) : (
                <tbody className="table-group-divider">
                  {allBooks.length ? (
                    filterBooks()?.map((b, i) => (
                      <tr key={i}>
                        <td>{`${b.hotel} ${b.address}`}</td>
                        <td>{b.date}</td>
                        <td>{b.name}</td>
                        <td>USD {b.price}</td>
                        <td>{b.cartQuantity}</td>
                        <td>{b.checkIn}</td>
                        <td>{b.checkOut}</td>
                        <td>{b.newStock}</td>
                        <td>{b.status}</td>
                        <td>
                          <button
                            id={b.id}
                            onClick={() =>
                              handleStatus({
                                id: b.id,
                                user: b.user,
                                status: "cancelled",
                              })
                            }
                            className="btn btn-outline-danger"
                            type="button"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "250px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1>No reservations found</h1>
                    </div>
                  )}
                </tbody>
              )}
            </table>
            {datos.rol === "superAdmin" ? (
              <button
                onClick={() => navigate("/profileSuperAdmin")}
                className="btn btn-primary my-3 w-auto"
                type="button"
              >
                Back
              </button>
            ) : (
              <button
                onClick={() => navigate("/profileAdmin")}
                className="btn btn-primary my-3 w-auto"
                type="button"
              >
                Back
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          className="btn btn-primary mt-1 mx-5 my-4"
          type="button"
          onClick={() => navigate(-1)}
        >
          Unauthorized entry, Back
        </button>
      )}
    </>
  );
};

export default Stock;
